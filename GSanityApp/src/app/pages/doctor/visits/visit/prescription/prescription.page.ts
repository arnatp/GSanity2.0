import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseUser, Prescription } from 'src/app/domain/intefaces';
import { VisitService } from 'src/app/services/visit.service';
@Component({
	selector: 'app-prescription',
	templateUrl: './prescription.page.html',
	styleUrls: ['./prescription.page.scss'],
})
export class PrescriptionPage implements OnInit {
	prescription = {
		medicamentName: '',
		quantity: null,
		schedule: null,
	};

	idvisit;
	constructor(
		public modalController: ModalController,
		private visitService: VisitService
	) {}

	ngOnInit() {
	}
	async dimiss() {
		await this.modalController.dismiss();
	}
	async createPrescription() {
		let newPrescription = {
			prescription: this.prescription,
		};
		await this.visitService.updateVisitPrescription(
			newPrescription,
			this.idvisit
		);
		await this.modalController.dismiss();
	}
}
