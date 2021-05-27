import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ChangeEmailPasswordModalPage } from '../../common/change-email-password-modal/change-email-password-modal.page';

@Component({
	selector: 'app-perfil',
	templateUrl: 'perfil.page.html',
	styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {
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
		private authService: AuthService,
		private router: Router,
		public modalConroller: ModalController
	) {
		this.userService
			.getUserByUid(JSON.parse(localStorage.getItem('user')).uid)
			.subscribe((user) => (this.user = user));
	}

	logout() {
		this.authService.logout().then((_) => {
			this.router.navigate(['welcome']);
		});
	}

	async changeEmail() {
		const modal = await this.modalConroller.create({
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
		const modal = await this.modalConroller.create({
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
}
