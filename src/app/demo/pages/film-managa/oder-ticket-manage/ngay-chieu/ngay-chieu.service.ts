import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { NgayChieu } from './ngay-chieu';
import { PagingResponse } from 'src/app/core/models/paging-response.model';
import { CommandURL } from 'src/app/theme/shared/constant/ManageURLCommand';


@Injectable({
  providedIn: 'root'
})
export class NgayChieuService {
  constructor(private http: HttpClient) {
  }

  // GET
  getCategory(pageNum: number, pageSize: number, searchKey: string): Observable<PagingResponse<NgayChieu>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('page', pageNum.toString()).set('limit', pageSize.toString()).set('keyword', searchKey);
    return this.http.get<PagingResponse<NgayChieu>>(CommandURL.NGAY_CHIEU + '/search', {headers, params});
  }

  // CREATE
  createNewCategory(category: NgayChieu) {
    return this.http.post<NgayChieu>(CommandURL.NGAY_CHIEU, category);
  }

  // UPDATE
  updateCategory(id: string, category: NgayChieu) {
    return this.http.put<NgayChieu>(CommandURL.NGAY_CHIEU + '/' + id, category);
  }

  // UPDATE_STATUS
  updateStatusCategory(id: string, category: NgayChieu) {
    return this.http.put<NgayChieu>(CommandURL.NGAY_CHIEU + '/' + id, category);
  }

  // DELETE
  deleteItemCategory(id: string) {
    return this.http.delete(CommandURL.NGAY_CHIEU + '/' + id);
  }

  getIdPhim(): Observable<{}> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(CommandURL.DANH_SACH_PHIM , {headers});
  }

  getIdSuatChieu(): Observable<{}>{
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(CommandURL.SUAT_CHIEU , {headers});
  }
}
