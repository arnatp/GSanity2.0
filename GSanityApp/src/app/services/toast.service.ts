import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(private toastController: ToastController) {}

	async presentToast(customMessage: string) {
		const toast = await this.toastController.create({
			message: customMessage,
			duration: 2500,
			mode: 'ios',
			translucent: false,
			color: 'danger',
			cssClass: 'toast',
		});
		toast.present();
	}

	async presentValidToast(customMessage: string) {
		const toast = await this.toastController.create({
			message: customMessage,
			duration: 2500,
			mode: 'ios',
			translucent: false,
			color: 'success',
			cssClass: 'toast',
		});
		toast.present();
	}
}
