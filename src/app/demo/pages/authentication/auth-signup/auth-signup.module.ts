import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthSignupRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
