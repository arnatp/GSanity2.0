import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseUser, Visit } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';
import { ModalController } from '@ionic/angular';
import { PrescriptionPage } from './prescription/prescription.page';
import { AlertService } from 'src/app/services/alert.service';

@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {
	public visit: Visit;
	public doctor: DatabaseUser;
	public resolution: Text;
	constructor(
		private visitService: VisitService,
		private activateRoute: ActivatedRoute,
		private userService: UserService,
		public modalConroller: ModalController,
		private router: Router,
		private alertService: AlertService
	) {}

	ngOnInit() {
		const visitId: string = this.activateRoute.snapshot.paramMap.get('id');
		this.visitService.getVisitById(visitId).subscribe((visit) => {
			this.visit = visit;
			this.visit.time = visit.time;

			this.userService.getUserByUid(visit.doctorUid).subscribe((doctor) => {
				this.doctor = doctor;
			});
		});
	}
	async openPrescription() {
		const modal = await this.modalConroller.create({
			component: PrescriptionPage,
			componentProps: {
				idvisit: this.visit.id,
			},
			animated: true,
			mode: 'ios',
			backdropDismiss: false,
			cssClass: 'prescription-modal',
		});
		return await modal.present();
	}
	updateVisit() {
		this.visit.resolution = this.resolution;
		if (this.visit.resolution.nodeValue !== '') {
			this.visit.completed = true;
			this.visitService.updateVisit(this.visit);
		}
		this.router.navigate(['doctor/visits']);
	}
	deletePrescription() {
		this.alertService
			.presentCustomAlert(
				'Borrar Receta',
				'Seguro que quieres eliminar la receta'
			)
			.then((result) => {
				if (result.data) {
					this.visit.prescription = null;
					this.visitService.updateVisit(this.visit);
				}
			});
	}
	notPresented(id: string) {
		this.alertService
			.presentCustomAlert(
				'alert.patientNotPresentedHeader',
				'alert.patientNotPresentedMessage'
			)
			.then((result) => {
				if (result.data) {
					this.visitService.deleteVisit(id);
					this.router.navigate(['doctor/visits']);
				}
			});
	}
}
