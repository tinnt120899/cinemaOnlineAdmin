import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EditorModule} from '@tinymce/tinymce-angular';
import {SharedModule} from '../../../theme/shared/shared.module';
import { TheatersComponent } from './he-thong-rap/theaters.component';
import { TheatersRoutingModule } from './theaters-routing.module';
import { ListTheatersComponent } from './danh-sach-rap/list-theaters.component';

@NgModule({
  imports: [
    TheatersRoutingModule,
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
    TheatersComponent,
    ListTheatersComponent
  ]
})
export class TheatersManageModule { }
