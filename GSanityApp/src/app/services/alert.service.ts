import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor(
		public alertController: AlertController,
		private userService: UserService
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
}
