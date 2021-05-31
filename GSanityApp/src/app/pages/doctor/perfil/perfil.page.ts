import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { ChangeEmailPasswordModalPage } from '../../common/change-email-password-modal/change-email-password-modal.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.page.html',
	styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
	language: string = this.translateService.currentLang;

	user: DatabaseUser = {
		uid: null,
		bornDate: null,
		dni: null,
		email: null,
		gender: null,
		mediCard: null,
		name: null,
		role: null,
		surnames: null,
	};

	constructor(
		private userService: UserService,
		private modalController: ModalController,
		private alertService: AlertService,
		private translateService: TranslateService
	) {}

	ngOnInit() {
		this.userService
			.getUserByUid(JSON.parse(localStorage.getItem('user')).uid)
			.subscribe((user) => (this.user = user));
	}

	logout() {
		this.alertService.presentAlertConfirmLogout();
	}

	async changeEmail() {
		const modal = await this.modalController.create({
			component: ChangeEmailPasswordModalPage,
			componentProps: {
				mode: 'email',
			},
			animated: true,
			mode: 'ios',
			backdropDismiss: false,
			cssClass: 'modal',
		});
		return await modal.present();
	}

	async changePassword() {
		const modal = await this.modalController.create({
			component: ChangeEmailPasswordModalPage,
			componentProps: {
				mode: 'password',
			},
			animated: true,
			mode: 'ios',
			backdropDismiss: false,
			cssClass: 'modal',
		});
		return await modal.present();
	}
	languageChange() {
		this.translateService.use(this.language);
	 }
}
