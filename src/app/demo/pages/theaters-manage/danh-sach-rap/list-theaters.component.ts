import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToasterService } from 'src/app/toaster.service';
import { ListTheatersService } from './list-theaters.service';
import { ListTheaters } from './list-theaters';
import { GlobalsService } from 'src/app/globals.service';
@Component({
  selector: 'app-list-theaters',
  templateUrl: './list-theaters.component.html',
  styleUrls: ['./list-theaters.component.scss']
})
export class ListTheatersComponent implements OnInit, AfterViewInit {
  title = ' Danh sách Rạp';
  danhSachTinhThanh = this.globals.listCity;
  listHeThongRap: {};

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  categoryList: Array<ListTheaters>;
  isLoading = false;
  searchKey = '';
  pageNum = 1;
  pageSize = 10; // default page size
  totalRecords = 0; // total number of records
  maxSize = 5;

  // Validate form
  form: FormGroup;
  submitted = false;
  updated = false;
  ids: string;
  nameBtnSubmit = 'Tạo mới';
  isStatus: string;
  // modal
  tinhThanh: string;

  idRap = 'Mã rạp'
  ma = 'Cum rạp';
  ten = 'Hệ thống rạp';
  tenRap = 'Tên rạp';
  diaChi = 'Địa chỉ';
  srcImage = 'Src image';

  ramdom: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: ListTheatersService,
    private toast: ToasterService,
    private globals: GlobalsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.onPageChange(1);
    // tslint:disable-next-line: max-line-length
    this.form = this.formBuilder.group({
      cumRap: ['', Validators.required],
      heThongRap: ['', Validators.required],
      tenRap: ['', Validators.required],
      diaChi: ['', Validators.required],
      srcImage: [''],
      routeName: ['']
    });
  }
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap((text) => {
          this.searchKey = this.searchInput.nativeElement.value;
          this.getPagedCategory();
        })
      )
      .subscribe();
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(formValue: ListTheaters) {

    if (this.updated === true) {
      this.service.updateCategory(this.ids, new ListTheaters(
        formValue.cumRap, formValue.heThongRap, formValue.tenRap , formValue.diaChi, formValue.srcImage, formValue.routeName))
        .subscribe(res => {
            this.toast.Success('Chúc mừng', 'Cập nhật thành công !!!');
            if (res !== null) {
              this.onReset();
            }
          },
          (err) => {
            this.toast.Error('Lỗi xảy ra', 'Mã hoặc tên bị trùng !!!');
          });
      setTimeout(() => {
        this.onPageSizeChange(this.pageSize);
      }, 200);
    } else if (this.form.valid) {

      this.service.createNewCategory(new ListTheaters(
        formValue.cumRap, formValue.heThongRap, formValue.tenRap , formValue.diaChi, formValue.srcImage, formValue.routeName))
        .subscribe(res => {
            this.categoryList.push(res);
            this.totalRecords++;
            this.toast.Success('Chúc mừng', 'Tạo mới thành công!!!');
            if (res !== null) {
              this.onReset();
            }
          },
          (err) => {
            this.toast.Error('Lỗi xảy ra', 'Mã hoặc tên bị trùng !!!');
          });


    } else if (this.form.invalid) {
      return this.toast.Error('Lỗi dữ liệu', 'Vui lòng không được bỏ trống trường có dấu *');
    }

  }

  onReset() {
    this.submitted = false;
    this.updated = false;
    this.nameBtnSubmit = 'Tạo mới';
    this.form.reset();
  }

  onPageChange(pageNum: number) {
    this.pageNum = pageNum;
    this.getPagedCategory();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.getPagedCategory();
  }

  getPagedCategory() {
    this.service.getCategory(this.pageNum, this.pageSize, this.searchKey).subscribe(data => {
      this.categoryList = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  getInfo(cumRap: string, heThongRap: string, tenRap: string, diaChi: string, srcImage: string, idRap: string, ids: string) {
    this.form.controls.cumRap.setValue(cumRap);
    this.form.controls.heThongRap.setValue(heThongRap);
    this.form.controls.tenRap.setValue(tenRap);
    this.form.controls.diaChi.setValue(diaChi);
    this.form.controls.srcImage.setValue(srcImage);
    this.form.controls.routeName.setValue(idRap);
    this.ids = ids;
    this.nameBtnSubmit = 'Cập nhật';
    this.updated = true;
  }


  deleteItem(id: string, ten: string) {
    const textConfirm = 'Sẽ được xóa khỏi cơ sở dữ liệu.';
    Swal.fire({
      title: '<span style="color: #2d8dc7;">' +  ten + '</span>',
      html: textConfirm,
      // @ts-ignore
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '',
      cancelButtonText: 'Suy nghĩ lại',
      confirmButtonText: 'Đồng ý'
    }).then((result) => {
      if (result.value) {
        this.service.deleteItemCategory(id).subscribe(res => {
        });
        setTimeout(() => {
          this.onPageSizeChange(this.pageSize);
        }, 200);
        Swal.fire(
          'Xóa thành công!',
          ten + ' đã được xóa khỏi danh sách.',
          'success'
        );
      }
    });
  }
  getHeThongRap(tinhThanh: string) {
    this.service.getHeThongRap(tinhThanh).subscribe(res => {
      this.listHeThongRap = res;
    });
  }

}
