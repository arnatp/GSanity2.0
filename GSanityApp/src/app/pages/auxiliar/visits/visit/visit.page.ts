import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseUser, Visit } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {
	public time;
	public visit: Visit;
	public doctor: DatabaseUser;
	public hoursPicked: string[] = [];
	public hours = [
		{ hour: '8:0' },
		{ hour: '8:30' },
		{ hour: '9:0' },
		{ hour: '9:30' },
		{ hour: '10:0' },
		{ hour: '10:30' },
		{ hour: '11:0' },
		{ hour: '11:30' },
		{ hour: '12:0' },
		{ hour: '12:30' },
		{ hour: '15:0' },
		{ hour: '15:30' },
		{ hour: '16:0' },
		{ hour: '16:30' },
		{ hour: '17:0' },
		{ hour: '17:30' },
		{ hour: '18:0' },
		{ hour: '18:30' },
		{ hour: '19:0' },
		{ hour: '19:30' },
	];

	constructor(
		private visitService: VisitService,
		private activateRoute: ActivatedRoute,
		private userService: UserService,
		public modalConroller: ModalController,
		private router: Router,
		private toastService: ToastService
	) {}

	ngOnInit() {
		const hours: string[] = [];
		const visitId: string = this.activateRoute.snapshot.paramMap.get('id');
		this.visitService.getVisitById(visitId).subscribe((visit) => {
			this.visit = visit;

			this.userService.getUserByUid(visit.doctorUid).subscribe((doctor) => {
				this.doctor = doctor;
			});
			this.visitService
				.getVisitsByDate(this.visit.date, this.visit.doctorUid)
				.subscribe((visits) => {
					visits.forEach((concreteVisit) => {
						hours.push(concreteVisit.time);
					});
				});
		});
		this.hoursPicked = hours;
	}

	updateVisit() {
		const date = new Date(this.time);
		const time: string = date.getHours() + ':' + date.getMinutes();
		if (this.time) {
			if (this.hoursPicked.indexOf(time) != -1) {
				this.toastService.presentToast(
					'la hora ya esta seleccionada para otra visita'
				);
			} else {
				this.visit.time = time;
				this.visit.dated = true;
				this.visitService.updateVisit(this.visit).then(() => {
					this.toastService.presentValidToast(
						'Se ha asignado la hora con éxito'
					);
				});
				this.router.navigate(['/auxiliar/visits']);
			}
		}
	}
}
