import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeEmailPasswordModalPageRoutingModule } from './change-email-password-modal-routing.module';

import { ChangeEmailPasswordModalPage } from './change-email-password-modal.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ChangeEmailPasswordModalPageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [ChangeEmailPasswordModalPage],
})
export class ChangeEmailPasswordModalPageModule {}
