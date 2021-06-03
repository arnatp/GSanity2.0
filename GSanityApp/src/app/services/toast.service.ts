import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(
		private toastController: ToastController,
		private translate: TranslateService
	) {}

	async presentToast(customMessage: string) {
		const toast = await this.toastController.create({
			message: this.translate.instant(customMessage),
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
			message: this.translate.instant(customMessage),
			duration: 2500,
			mode: 'ios',
			translucent: false,
			color: 'success',
			cssClass: 'toast',
		});
		toast.present();
	}
}
