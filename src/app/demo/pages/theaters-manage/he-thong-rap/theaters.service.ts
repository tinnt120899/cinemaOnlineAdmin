import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagingResponse} from '../../../../core/models/paging-response.model';
import {CommandURL} from '../../../../theme/shared/constant/ManageURLCommand';
import { Theaters } from './theaters';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {
  constructor(private http: HttpClient) { }

  // GET
  getCategory(pageNum: number, pageSize: number, searchKey: string): Observable<PagingResponse<Theaters>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('page', pageNum.toString()).set('limit', pageSize.toString()).set('keyword', searchKey);
    return this.http.get<PagingResponse<Theaters>>(CommandURL.HE_THONG_RAP + '/search', { headers, params });
  }

  // CREATE
  createNewCategory(category: Theaters) {
    return this.http.post<Theaters>(CommandURL.HE_THONG_RAP, category);
  }

  // UPDATE
  updateCategory(id: string, category: Theaters) {
    return this.http.put<Theaters>(CommandURL.HE_THONG_RAP + '/' + id, category);
  }

  // UPDATE_STATUS
  updateStatusCategory(id: string, category: Theaters) {
    return this.http.put<Theaters>(CommandURL.HE_THONG_RAP + '/' + id, category);
  }

  // DELETE
  deleteItemCategory(id: string) {
    return this.http.delete(CommandURL.HE_THONG_RAP + '/' + id);
  }
}

