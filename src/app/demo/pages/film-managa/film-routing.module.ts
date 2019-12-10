import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFilmComponent } from './list-film/list-film.component';
import { FilmInfoComponent } from './film-info/film-info.component';
import { NgayChieuComponent } from './oder-ticket-manage/ngay-chieu/ngay-chieu.component';
import { SuatChieuComponent } from './oder-ticket-manage/suat-chieu/suat-chieu.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'danhsachphim',
        component: ListFilmComponent
      },
      {
        path: 'thongtinphim',
        component: FilmInfoComponent
      },
      {
        path: 'danhsachphim/ngaychieu',
        component: NgayChieuComponent
      },
      {
        path: 'danhsachphim/suatchieu',
        component: SuatChieuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
