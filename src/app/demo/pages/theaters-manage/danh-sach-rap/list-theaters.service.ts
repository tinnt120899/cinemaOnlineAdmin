import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagingResponse} from '../../../../core/models/paging-response.model';
import {CommandURL} from '../../../../theme/shared/constant/ManageURLCommand';
import { ListTheaters } from './list-theaters';


@Injectable({
  providedIn: 'root'
})
export class ListTheatersService {
  constructor(private http: HttpClient) { }

  // GET
  getCategory(pageNum: number, pageSize: number, searchKey: string): Observable<PagingResponse<ListTheaters>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('page', pageNum.toString()).set('limit', pageSize.toString()).set('keyword', searchKey);
    return this.http.get<PagingResponse<ListTheaters>>(CommandURL.DANH_SACH_RAP + '/search', { headers, params });
}

  // CREATE
  createNewCategory(category: ListTheaters) {
    return this.http.post<ListTheaters>(CommandURL.DANH_SACH_RAP, category);
  }

  // UPDATE
  updateCategory(id: string, category: ListTheaters) {
    return this.http.put<ListTheaters>(CommandURL.DANH_SACH_RAP + '/' + id, category);
  }

  // UPDATE_STATUS
  updateStatusCategory(id: string, category: ListTheaters) {
    return this.http.put<ListTheaters>(CommandURL.DANH_SACH_RAP + '/' + id, category);
  }

  // DELETE
  deleteItemCategory(id: string) {
    return this.http.delete(CommandURL.DANH_SACH_RAP + '/' + id);
  }
// GET BY ...
  public getHeThongRap(tinhThanh): Observable<ListTheaters> {
    return this.http.get<ListTheaters>(CommandURL.DS_RAP_THEO_TINH_THANH + '?tinhThanh=' + tinhThanh);
  }

}

