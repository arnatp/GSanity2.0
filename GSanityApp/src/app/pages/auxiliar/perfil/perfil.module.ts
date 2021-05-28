import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { TextAvatarModule } from 'src/app/components/text-avatar';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TextAvatarModule,
		PerfilPageRoutingModule,
	],
	declarations: [PerfilPage],
})
export class PerfilPageModule {}
