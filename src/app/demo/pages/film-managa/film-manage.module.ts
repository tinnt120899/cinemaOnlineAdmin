import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EditorModule} from '@tinymce/tinymce-angular';
import {SharedModule} from '../../../theme/shared/shared.module';
import { FilmRoutingModule } from './film-routing.module';
import { ListFilmComponent } from './list-film/list-film.component';
import { FilmInfoComponent } from './film-info/film-info.component';
import { NgayChieuComponent } from './oder-ticket-manage/ngay-chieu/ngay-chieu.component';
import { SuatChieuComponent } from './oder-ticket-manage/suat-chieu/suat-chieu.component';

@NgModule({
  imports: [
    FilmRoutingModule,
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
    ListFilmComponent,
    FilmInfoComponent,
    NgayChieuComponent,
    SuatChieuComponent
  ]
})
export class FilmManageModule { }
