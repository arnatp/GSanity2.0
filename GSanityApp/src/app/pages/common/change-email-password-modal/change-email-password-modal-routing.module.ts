import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeEmailPasswordModalPage } from './change-email-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeEmailPasswordModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeEmailPasswordModalPageRoutingModule {}
