import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseUser, Visit } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {
	public time;

	public visit: Visit;
	public doctor: DatabaseUser;

	constructor(
		private visitService: VisitService,
		private activateRoute: ActivatedRoute,
		private userService: UserService,
		public modalConroller: ModalController,
		private router: Router
	) {}

	ngOnInit() {
		const visitId: string = this.activateRoute.snapshot.paramMap.get('id');
		this.visitService.getVisitById(visitId).subscribe((visit) => {
			this.visit = visit;

			this.userService.getUserByUid(visit.doctorUid).subscribe((doctor) => {
				this.doctor = doctor;
			});
		});
	}

	updateVisit() {
		const date = new Date(this.time);

		if (this.time) {
			this.visit.time = date.getHours() + ':' + date.getMinutes();
			this.visit.dated = true;
			this.visitService.updateVisit(this.visit);
		}
		this.router.navigate(['/auxiliar/visits']);
	}
}
