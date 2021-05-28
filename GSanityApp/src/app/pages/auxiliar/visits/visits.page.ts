import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit, DatabaseUser } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {
	public visits: Observable<Visit[]>;
	public doctors: Observable<DatabaseUser[]>;
	doctorUid: string = '';

	constructor(
		private visitService: VisitService,
		private userService: UserService
	) {
		this.doctors = this.userService.getAllDoctors();
	}

	ngOnInit() {this.getDoctorVisits()}

	getDoctorVisits() {
		console.log(this.doctorUid);
		if (this.doctorUid == '') {
			this.visits = this.visitService.getNotDatedVisits();
		} else {
			this.visits = this.visitService.getNotDatedVisitsByDoctorUid(
				this.doctorUid
			);
		}
	}
}
