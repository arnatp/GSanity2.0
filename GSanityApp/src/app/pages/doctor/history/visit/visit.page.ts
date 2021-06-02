import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseUser, Visit } from 'src/app/domain/intefaces';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {
	public visit: Visit;
	public patient: DatabaseUser;
	public doctor: DatabaseUser;
	constructor(
		private visitService: VisitService,
		private activateRoute: ActivatedRoute,
		private userService: UserService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		const visitId: string = this.activateRoute.snapshot.paramMap.get('id');
		this.visitService.getVisitById(visitId).subscribe((visit) => {
			this.visit = visit;

			this.userService
				.getUserByUid(visit.patientUid)
				.subscribe((patient) => {
					this.patient = patient;
				});
			this.userService.getUserByUid(visit.doctorUid).subscribe((doctor) => {
				this.doctor = doctor;
			});
		});
	}
	print(uid: string) {
		this.toastService.presentToast('Imprimir una visita no disponible');
	}
}
