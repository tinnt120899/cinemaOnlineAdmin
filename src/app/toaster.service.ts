import { Injectable } from '@angular/core';
declare var toastr: any;
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() {
    this.configToastr();
  }

  Success(title: string, message?: string) {
    toastr.success(message, title);
  }

  Warning(title: string, message?: string) {
    toastr.warning(message, title);
    toastr.warning(message, title);
  }

  Error(title: string, message?: string) {
    toastr.error(message, title);
  }

  Info(title: string, message?: string) {
    toastr.info(message, title);
  }

  configToastr() {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    };
  }
}
