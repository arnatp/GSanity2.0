import { VisitService } from './../../../services/visit.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/domain/intefaces';
import { AlertService } from 'src/app/services/alert.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	public visits: Observable<Visit[]>;
	constructor(
		private visitService: VisitService,
		private alertService: AlertService
	) {}
	ngOnInit() {
		this.visits = this.visitService.getUpcomingVisits(
			JSON.parse(localStorage.getItem('user')).uid
		);
	}

	cancelVisit(visitId) {
		this.alertService
			.presentCustomAlert(
				'alert.cancelVisitHeader',
				'alert.cancelVisitMessage'
			)
			.then((result) => {
				if (result.data) {
					this.deleteVisit(visitId);
				}
			});
	}

	deleteVisit(visitId) {
		this.visitService.deleteVisit(visitId);
	}
}
