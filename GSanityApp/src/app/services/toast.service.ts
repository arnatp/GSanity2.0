import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(private toastController: ToastController) {}

	async presentToast(customMessage: string, customDuration: number) {
		const toast = await this.toastController.create({
			message: customMessage,
			duration: customDuration,
		});
		toast.present();
	}
}
