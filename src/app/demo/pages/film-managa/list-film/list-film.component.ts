import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToasterService } from 'src/app/toaster.service';
import { GlobalsService } from 'src/app/globals.service';
import { ListFilm } from './list-film';
import { ListFilmService } from './list-film.service';
@Component({
  selector: 'app-list-film',
  templateUrl: './list-film.component.html',
  styleUrls: ['./list-film.component.scss']
})
export class ListFilmComponent implements OnInit, AfterViewInit {
  title = ' Danh sách Phim';
  listTrangThai = [
    'Đang chiếu',
    'Sắp chiếu'
  ];

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  categoryList: Array<ListFilm>;
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

  ma = 'Mã phim';
  ten = 'Tên phim';
  thoiLuongChieu = 'Thời lượng phim';
  srcImageSm = 'Link hình nhỏ';
  srcImageMd = 'Link hình vừa';
  srcImageLg = 'Link hình to';
  trangThai = 'Trạng thái';

  ramdom: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: ListFilmService,
    private toast: ToasterService,
    private globals: GlobalsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.onPageChange(1);
    // tslint:disable-next-line: max-line-length
    this.form = this.formBuilder.group({
      idPhim: ['', Validators.required],
      tenPhim: ['', Validators.required],
      thoiLuongChieu: ['', Validators.required],
      srcImageSm: [''],
      srcImageMd: [''],
      srcImageLg: [''],
      trangThai: ['', Validators.required]
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

  onSubmit(formValue: ListFilm) {

    if (this.updated === true) {
      this.service.updateCategory(this.ids, new ListFilm(formValue.idPhim, formValue.tenPhim, formValue.thoiLuongChieu , formValue.srcImageSm, formValue.srcImageMd, formValue.srcImageLg, formValue.trangThai))
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

      this.service.createNewCategory(new ListFilm(formValue.idPhim, formValue.tenPhim, formValue.thoiLuongChieu , formValue.srcImageSm, formValue.srcImageMd, formValue.srcImageLg, formValue.trangThai))
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

  getInfo(idPhim: string, tenPhim: string, thoiLuongChieu: string, srcImageSm: string, srcImageMd: string, srcImageLg: string, trangThai: string, ids: string) {
    this.form.controls.idPhim.setValue(idPhim);
    this.form.controls.tenPhim.setValue(tenPhim);
    this.form.controls.thoiLuongChieu.setValue(thoiLuongChieu);
    this.form.controls.srcImageSm.setValue(srcImageSm);
    this.form.controls.srcImageMd.setValue(srcImageMd);
    this.form.controls.srcImageLg.setValue(srcImageLg);
    this.form.controls.trangThai.setValue(trangThai);
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

}
