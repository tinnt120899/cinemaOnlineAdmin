import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NewsCreateService} from './news-create.service';
import {NewsCreate} from './news-create';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToasterService } from 'src/app/toaster.service';
@Component({
  selector: 'app-news',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit, AfterViewInit {
    title = ' Tin tức';

    @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

    categoryList: Array<NewsCreate>;
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
    id: string;
    nameBtnSubmit = 'Tạo mới';
    isStatus: string;
    // modal
    maTinTuc: string;
    tieuDe: string;
    ghiChu: string;

    ma = 'Mã tin tức';
    ten = 'Tiêu đề';
    tieuDePhu = 'Tiêu đề phụ';
    srcImage = 'Src image';
    ngayDang = 'Ngày đăng';
    noiDung = 'Nội dung';



    constructor(
        private formBuilder: FormBuilder,
        private service: NewsCreateService,
        private toast: ToasterService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.onPageChange(1);
        // tslint:disable-next-line: max-line-length
        this.form = this.formBuilder.group({
            maTinTuc: ['', Validators.required],
            tieuDe: ['', Validators.required],
            tieuDePhu: [''],
            srcImage: [''],
            ngayDang: [''],
            noiDung: ['']
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

    onSubmit(formValue: NewsCreate) {

        if (this.updated === true) {
           this.maTinTuc = formValue.maTinTuc.replace(/\s\s+/g, ' ').trim();
           this.tieuDe = formValue.tieuDe.replace(/\s\s+/g, ' ').trim() ;
           this.service.updateCategory(this.id, new NewsCreate(
             this.maTinTuc, this.tieuDe, formValue.tieuDePhu, formValue.srcImage, formValue.ngayDang, formValue.noiDung))
               .subscribe(res => {
                 this.toast.Success('Chúc mừng', 'Cập nhật thành công !!!');
                   if (res !== null) {
                       this.onReset();
                   }
               });
           setTimeout(() => {
               this.onPageSizeChange(this.pageSize);
           }, 200);
       } else if (this.form.valid) {
           this.maTinTuc = formValue.maTinTuc.replace(/\s\s+/g, ' ').trim();
           this.tieuDe = formValue.tieuDe.replace(/\s\s+/g, ' ').trim() ;
           this.service.createNewCategory(new NewsCreate(
             this.maTinTuc, this.tieuDe, formValue.tieuDePhu, formValue.srcImage, formValue.ngayDang, formValue.noiDung))
             .subscribe(res => {
               this.categoryList.push(res);
               this.totalRecords++;
               this.toast.Success('Chúc mừng', 'Tạo mới thành công!!!');
               if (res !== null) {
                   this.onReset();
               }
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

    getInfo(maTinTuc: string, tieuDe: string, tieuDePhu: string, srcImage: string, ngayDang: string, noiDung: string, id: string) {
        this.form.controls.maTinTuc.setValue(maTinTuc);
        this.form.controls.tieuDe.setValue(tieuDe);
        this.form.controls.tieuDePhu.setValue(tieuDePhu);
        this.form.controls.srcImage.setValue(srcImage);
        this.form.controls.ngayDang.setValue(ngayDang);
        this.form.controls.noiDung.setValue(noiDung);
        this.id = id;
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
