import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewsCreate} from './news-create';
import {PagingResponse} from '../../../../core/models/paging-response.model';
import {CommandURL} from '../../../../theme/shared/constant/ManageURLCommand';

@Injectable({
  providedIn: 'root'
})
export class NewsCreateService {
  constructor(private http: HttpClient) { }

  // GET
  getCategory(pageNum: number, pageSize: number, searchKey: string): Observable<PagingResponse<NewsCreate>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('page', pageNum.toString()).set('limit', pageSize.toString()).set('keyword', searchKey);
    return this.http.get<PagingResponse<NewsCreate>>(CommandURL.TIN_TUC + '/search', { headers, params });
  }

  // CREATE
  createNewCategory(category: NewsCreate) {
    return this.http.post<NewsCreate>(CommandURL.TIN_TUC, category);
  }

  // UPDATE
  updateCategory(id: string, category: NewsCreate) {
    return this.http.put<NewsCreate>(CommandURL.TIN_TUC + '/' + id, category);
  }

  // UPDATE_STATUS
  updateStatusCategory(id: string, category: NewsCreate) {
    return this.http.put<NewsCreate>(CommandURL.TIN_TUC + '/' + id, category);
  }

  // DELETE
  deleteItemCategory(id: string) {
    return this.http.delete(CommandURL.TIN_TUC + '/' + id);
  }
}

