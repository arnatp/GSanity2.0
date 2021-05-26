import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	public visit: Visit;
	public doctor: DatabaseUser;

	constructor(
		private visitService: VisitService,
		private activateRoute: ActivatedRoute,
		private userService: UserService,
		public modalConroller: ModalController
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
		if (this.visit.resolution.nodeValue != '') {
			this.visit.completed = true;
			this.visitService.updateVisit(this.visit);
		}
		console.log(this.visit);
	}
}
