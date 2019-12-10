import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PagingResponse } from 'src/app/core/models/paging-response.model';
import { CommandURL } from 'src/app/theme/shared/constant/ManageURLCommand';
import { SuatChieu } from './suat-chieu';


@Injectable({
  providedIn: 'root'
})
export class SuatChieuService {
  constructor(private http: HttpClient) {
  }

  // GET
  getCategory(pageNum: number, pageSize: number, searchKey: string): Observable<PagingResponse<SuatChieu>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('page', pageNum.toString()).set('limit', pageSize.toString()).set('keyword', searchKey);
    return this.http.get<PagingResponse<SuatChieu>>(CommandURL.SUAT_CHIEU + '/search', {headers, params});
  }

  // CREATE
  createNewCategory(category: SuatChieu) {
    return this.http.post<SuatChieu>(CommandURL.SUAT_CHIEU, category);
  }

  // UPDATE
  updateCategory(id: string, category: SuatChieu) {
    return this.http.put<SuatChieu>(CommandURL.SUAT_CHIEU + '/' + id, category);
  }

  // UPDATE_STATUS
  updateStatusCategory(id: string, category: SuatChieu) {
    return this.http.put<SuatChieu>(CommandURL.SUAT_CHIEU + '/' + id, category);
  }

  // DELETE
  deleteItemCategory(id: string) {
    return this.http.delete(CommandURL.SUAT_CHIEU + '/' + id);
  }

  getIdSeatMap(): Observable<{}>{
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(CommandURL.SEAT_MAP , {headers});
  }
}
