import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitsPage } from './visits.page';

const routes: Routes = [
  {
    path: '',
    component: VisitsPage
  },
  {
    path: 'visit',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitsPageRoutingModule {}
