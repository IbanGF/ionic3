import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      });
    }
    return next.handle(req).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (this.is2xxStatus(response)) {
            return of(new HttpResponse({
              headers: response.headers,
              status: response.status,
              statusText: response.statusText,
              url: response.url,
              body: true
            }));
          }

        }
        return _throw(response);
      }
      )
    );
  }
  private is2xxStatus(response: HttpResponseBase) {
    return response.status >= 200 && response.status < 300 && response.statusText === 'OK';
  }

}
