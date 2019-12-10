import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ToasterService } from 'src/app/toaster.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toasterService: ToasterService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let error: any = null;
            if (err.status === 406 || err.status === 404) {
                // auto logout if 40q response returned from api
                this.toasterService.Error('Lỗi dữ liệu', 'Mã hoặc Tên đã bị trùng! Vui lòng nhập Mã và Tên khác.');
            } else if (err.status === 500) {
              // auto logout if 40q response returned from api
              this.toasterService.Error('Lỗi dữ liệu', 'Mã hoặc Tên cập nhật đã bị trùng! Vui lòng nhập Mã và Tên khác.');
            } else {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    error = err.error.message;
                    this.toasterService.Error('Lỗi dữ liệu', error);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong
                    error = err.error;
                    this.toasterService.Error('Lỗi dữ liệu', error);
                }
            }
            console.log('status: ' + err.status);
            return throwError(error);
        }));
    }
}
