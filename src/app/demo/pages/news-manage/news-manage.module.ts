import { NgModule } from '@angular/core';
import {NewsCreateComponent} from './news-create/news-create.component';
import {NewsRoutingModule} from './news-routing.module';
import {CommonModule} from '@angular/common';
import {NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EditorModule} from '@tinymce/tinymce-angular';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  imports: [
    NewsRoutingModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbDropdownModule,
    HttpClientModule,
    EditorModule,
    SharedModule

  ],
  declarations: [
    NewsCreateComponent
  ]
})
export class NewsManageModule { }
