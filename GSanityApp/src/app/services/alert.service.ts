import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor(
		public alertController: AlertController,
		private authService: AuthService,
		private router: Router
	) {}

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

	async presentCustomAlert(headerText, messageText) {
		let choice;
		const alert = await this.alertController.create({
			mode: 'ios',
			cssClass: 'my-custom-class',
			header: headerText,
			message: messageText,
			buttons: [
				{
					text: 'Cancel',
					cssClass: 'secondary',
					handler: () => {
						alert.dismiss(false);
						return false;
					},
				},
				{
					text: 'Okay',
					handler: () => {
						console.log('Confirm Okay');
						alert.dismiss(true);
						return false;
					},
				},
			],
		});
		await alert.present();
		await alert.onDidDismiss().then((data) => {
			choice = data;
		});

		return choice;
	}
}
