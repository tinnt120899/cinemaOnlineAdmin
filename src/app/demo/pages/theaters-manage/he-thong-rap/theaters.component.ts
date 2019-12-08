import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Theaters } from './theaters';
import { TheatersService } from './theaters.service';
@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss']
})
export class TheatersComponent implements OnInit, AfterViewInit {
  title = ' Hệ thống rạp';

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  categoryList: Array<Theaters>;
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
  id: string;
  nameList: string;

  ma = 'Id';
  ten = 'Hệ thống rạp';
  tinhThanh = 'Tỉnh thành';
  srcImage = 'Src image';


  constructor(
    private formBuilder: FormBuilder,
    private service: TheatersService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.onPageChange(1);
    // tslint:disable-next-line: max-line-length
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      nameList: ['', Validators.required],
      tinhThanh: [''],
      srcImage: [''],
      href: ['']
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

  onSubmit(formValue: Theaters) {

    if (this.updated === true) {
      this.id = formValue.id.replace(/\s\s+/g, ' ').trim();
      this.nameList = formValue.nameList.replace(/\s\s+/g, ' ').trim() ;
      this.service.updateCategory(this.id, new Theaters(
        formValue.tinhThanh, this.nameList, this.id , this.id+'s', formValue.srcImage))
        .subscribe(res => {
          // toast
          if (res !== null) {
            this.onReset();
          }
        });
      setTimeout(() => {
        this.onPageSizeChange(this.pageSize);
      }, 200);
    } else if (this.form.valid) {
      this.id = formValue.id.replace(/\s\s+/g, ' ').trim();
      this.nameList = formValue.nameList.replace(/\s\s+/g, ' ').trim() ;
      this.service.createNewCategory(new Theaters(
        formValue.tinhThanh, this.nameList, this.id , this.id+'s', formValue.srcImage))
        .subscribe(res => {
          this.categoryList.push(res);
          this.totalRecords++;
          // toast
          if (res !== null) {
            this.onReset();
          }
        });


    } else if (this.form.invalid) {
      // toast
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

  getInfo(tinhThanh: string, nameList: string, id: string, href: string, srcImage: string, ids: string) {
    this.form.controls.tinhThanh.setValue(tinhThanh);
    this.form.controls.nameList.setValue(nameList);
    this.form.controls.id.setValue(id);
    this.form.controls.href.setValue(href);
    this.form.controls.srcImage.setValue(srcImage);
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
