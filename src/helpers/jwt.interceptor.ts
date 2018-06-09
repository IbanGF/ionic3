import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  options: any
  constructor(private storage: Storage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fromPromise(this.getToken())
      .switchMap(token => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: JSON.parse(token)
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
      });

  }
  private getToken() {
    return this.storage.get('currentUser')
      .then(token => {
        return token;
      })
  }
  private is2xxStatus(response: HttpResponseBase) {
    console.log(response)
    return response.status >= 200 && response.status < 300 && response.statusText === 'OK';
  }

}
