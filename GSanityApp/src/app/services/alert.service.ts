import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor(
		public alertController: AlertController,
		private userService: UserService,
		private authService: AuthService,
		private router: Router
	) {}

	async presentAlertConfirmDeleteUser(id) {
		const alert = await this.alertController.create({
			mode: 'ios',
			cssClass: 'my-custom-class',
			header: 'Confirm!',
			message: 'Message <strong>text</strong>!!!',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel: blah');
					},
				},
				{
					text: 'Okay',
					handler: () => {
						console.log('Confirm Okay');
						this.userService.delete(id);
					},
				},
			],
		});

		await alert.present();
	}

	async presentAlertConfirmLogout() {
		const alert = await this.alertController.create({
			mode: 'ios',
			cssClass: 'my-custom-class',
			header: 'Desconectarse',
			message: '¿Quieres cerrar la sesión?',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel: blah');
					},
				},
				{
					text: 'Aceptar',
					handler: () => {
						console.log('Confirm Okay');
						this.authService.logout().then((_) => {
							this.router.navigate(['welcome']);
						});
					},
				},
			],
		});
		await alert.present();
	}
}
