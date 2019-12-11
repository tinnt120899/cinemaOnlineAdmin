import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Auth} from './auth';
import {PagingResponse} from '../../../core/models/paging-response.model';
import {CommandURL} from '../../../theme/shared/constant/ManageURLCommand';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // GET
  getCategory(pageNum: number, pageSize: number, searchKey: string): Observable<PagingResponse<Auth>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('page', pageNum.toString()).set('limit', pageSize.toString()).set('keyword', searchKey);
    return this.http.get<PagingResponse<Auth>>(CommandURL.SIGN_IN + '/search', { headers, params });
}

  // CREATE
  createNewCategory(category: Auth) {
    return this.http.post<Auth>(CommandURL.SIGN_UP, category);
  }

  // UPDATE
  updateCategory(id: string, category: Auth) {
    return this.http.put<Auth>(CommandURL.SIGN_IN + '/' + id, category);
  }

  // UPDATE_STATUS
  updateStatusCategory(id: string, category: Auth) {
    return this.http.put<Auth>(CommandURL.SIGN_IN + '/' + id, category);
  }

  // DELETE
  deleteItemCategory(id: string) {
    return this.http.delete(CommandURL.SIGN_IN + '/' + id);
  }

  // CHECK LOGIN
  checkLogin(username: string, password: string) {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.get(CommandURL.SIGN_IN, { params });
  }

}

