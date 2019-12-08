import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsCreateComponent} from './news-create/news-create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: NewsCreateComponent
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
