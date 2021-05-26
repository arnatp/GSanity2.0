import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/domain/intefaces';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {
	public visits: Observable<Visit[]>;
	constructor(private visitService: VisitService) {}

	ngOnInit() {
		this.visits = this.visitService.getVisitsAssignedToDoctorByUid(
			JSON.parse(localStorage.getItem('user')).uid
		);
	}
}
