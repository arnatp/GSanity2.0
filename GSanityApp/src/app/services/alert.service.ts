import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor(
		public alertController: AlertController,
		private authService: AuthService,
		private router: Router,
		private translate: TranslateService
	) {}

	async presentAlertConfirmLogout() {
		const alert = await this.alertController.create({
			mode: 'ios',
			cssClass: 'my-custom-class',
			header: this.translate.instant('alert.disconnectHeader'),
			message: this.translate.instant('alert.disconnectMessage'),
			buttons: [
				{
					text: this.translate.instant('alert.cancelButton'),
					role: 'cancel',
					cssClass: 'secondary',

				},
				{
					text: this.translate.instant('alert.acceptButton'),
					handler: () => {
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
			header: this.translate.instant(headerText),
			message: this.translate.instant(messageText),
			buttons: [
				{
					text: this.translate.instant('alert.cancelButton'),
					cssClass: 'secondary',
					handler: () => {
						alert.dismiss(false);
						return false;
					},
				},
				{
					text: this.translate.instant('alert.acceptButton'),
					handler: () => {
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
