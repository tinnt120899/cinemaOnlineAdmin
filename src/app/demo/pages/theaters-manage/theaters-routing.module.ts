import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheatersComponent } from './he-thong-rap/theaters.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hethongrap',
        component: TheatersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatersRoutingModule { }
