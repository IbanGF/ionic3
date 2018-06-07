import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class AuthProvider {

  constructor(public api: Api, public http: HttpClient) { }


}
