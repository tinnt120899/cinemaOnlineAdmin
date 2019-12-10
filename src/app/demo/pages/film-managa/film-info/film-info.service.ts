import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagingResponse} from '../../../../core/models/paging-response.model';
import {CommandURL} from '../../../../theme/shared/constant/ManageURLCommand';
import { FilmInfo } from './film-info';


@Injectable({
  providedIn: 'root'
})
export class FilmInfoService {
  constructor(private http: HttpClient) { }

  // GET
  getCategory(pageNum: number, pageSize: number, searchKey: string): Observable<PagingResponse<FilmInfo>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('page', pageNum.toString()).set('limit', pageSize.toString()).set('keyword', searchKey);
    return this.http.get<PagingResponse<FilmInfo>>(CommandURL.DANH_SACH_PHIM + '/search', { headers, params });
  }

  // CREATE
  createNewCategory(category: FilmInfo) {
    return this.http.post<FilmInfo>(CommandURL.DANH_SACH_PHIM, category);
  }

  // UPDATE
  updateCategory(id: string, category: FilmInfo) {
    return this.http.put<FilmInfo>(CommandURL.DANH_SACH_PHIM + '/' + id, category);
  }

  // UPDATE_STATUS
  updateStatusCategory(id: string, category: FilmInfo) {
    return this.http.put<FilmInfo>(CommandURL.DANH_SACH_PHIM + '/' + id, category);
  }

  // DELETE
  deleteItemCategory(id: string) {
    return this.http.delete(CommandURL.DANH_SACH_PHIM + '/' + id);
  }

}

