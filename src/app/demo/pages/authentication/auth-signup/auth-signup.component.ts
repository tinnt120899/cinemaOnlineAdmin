import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from '../../../../toaster.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Auth} from '../auth';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  form: FormGroup;
  username: string;
  email: string;
  password: string;
  list = {};
  constructor(  private toast: ToasterService,
                private formBuilder: FormBuilder,
                private service: AuthService,
                private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit(formValue: Auth) {
    this.username = formValue.username.toLowerCase();
    this.email = formValue.email.toLowerCase();
    this.password = formValue.password.toLowerCase();
    if (this.form.valid) {
      this.service.createNewCategory(new Auth(this.username, this.password, this.email)).subscribe(res => {
        console.log(res);
        this.toast.Success('Chúc mừng', 'Đã tạo tạo khoản thành công!');
        this.signupSuccess();
      });
    } else if (this.form.invalid) {
      return this.toast.Error('Lỗi dữ liệu', 'Username, password không được trống hoặc email đã sai định dạng vidu@gmail.com!!!');
    }

  }

  signupSuccess() {
    this.router.navigate(['/auth/signin']);
  }
}
