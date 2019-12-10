import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToasterService } from 'src/app/toaster.service';
import { GlobalsService } from 'src/app/globals.service';
import { FilmInfo } from './film-info';
import { FilmInfoService } from './film-info.service';
@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.scss']
})
export class FilmInfoComponent implements OnInit, AfterViewInit {
  title = ' Thông tin Phim';
  listTrangThai: [
    'Đang chiếu',
    'Sắp chiếu'
  ];

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  categoryList: Array<FilmInfo>;
  isLoading = false;
  searchKey = '';
  pageNum = 1;
  pageSize = 5; // default page size
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
  idPhim: string;
  thoiLuongChieu: string;
  srcImageSm: string;
  srcImageMd: string;
  srcImageLg: string;
  trangThai: string;

  ten = 'Tên phim';
  ngayPhatHanh = 'Ngày phát hành';
  daoDien = 'Đạo diễn';
  dienVien = 'Diễn viên';
  theLoai = 'Thể loại';
  quocGiaSx = 'Quốc gia';
  noiDung = 'Nội dung';
  linkTrailer = 'Link trailer';

  constructor(
    private formBuilder: FormBuilder,
    private service: FilmInfoService,
    private toast: ToasterService,
    private globals: GlobalsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.onPageChange(1);
    // tslint:disable-next-line: max-line-length
    this.form = this.formBuilder.group({
      tenPhim: ['', Validators.required],
      ngayPhatHanh: ['', Validators.required],
      daoDien: ['', Validators.required],
      dienVien: ['', Validators.required],
      theLoai: ['', Validators.required],
      quocGiaSx: ['', Validators.required],
      noiDung: ['', Validators.required],
      linkTrailer: ['', Validators.required],
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

  onSubmit(formValue: FilmInfo) {

    if (this.updated === true) {
      this.service.updateCategory(this.ids, new FilmInfo(
        this.idPhim, formValue.tenPhim, this.thoiLuongChieu , this.srcImageSm, this.srcImageMd, this.srcImageLg, this.trangThai,
        formValue.ngayPhatHanh, formValue.daoDien, formValue.dienVien , formValue.theLoai, formValue.quocGiaSx, formValue.noiDung, formValue.linkTrailer ))
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
      this.service.updateCategory(this.ids, new FilmInfo(
        this.idPhim, formValue.tenPhim, this.thoiLuongChieu , this.srcImageSm, this.srcImageMd, this.srcImageLg, this.trangThai,
        formValue.ngayPhatHanh, formValue.daoDien, formValue.dienVien , formValue.theLoai, formValue.quocGiaSx, formValue.noiDung, formValue.linkTrailer ))
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

  getInfo(idPhim: string, tenPhim: string, thoiLuongChieu: string, srcImageSm: string, srcImageMd: string, srcImageLg: string, trangThai: string,
          ngayPhatHanh: string, daoDien: string, dienVien: string , theLoai: string, quocGiaSx: string, noiDung: string, linkTrailer: string, ids: string) {
    this.idPhim = idPhim;
    this.form.controls.tenPhim.setValue(tenPhim);
    this.thoiLuongChieu = thoiLuongChieu;
    this.srcImageSm = srcImageSm;
    this.srcImageMd = srcImageMd;
    this.srcImageLg = srcImageLg;
    this.trangThai = trangThai;
    this.form.controls.ngayPhatHanh.setValue(ngayPhatHanh);
    this.form.controls.daoDien.setValue(daoDien);
    this.form.controls.dienVien.setValue(dienVien);
    this.form.controls.theLoai.setValue(theLoai);
    this.form.controls.quocGiaSx.setValue(quocGiaSx);
    this.form.controls.noiDung.setValue(noiDung);
    this.form.controls.linkTrailer.setValue(linkTrailer);
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
