
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiResponse  from '../model/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: object) {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, payload);
  }
}
