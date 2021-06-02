import { VisitService } from './../../../services/visit.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';
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
		console.log('vas a cancelar la visita:', visitId);

		this.alertService
			.presentCustomAlert(
				'Cancelar Visita',
				'¿Seguro que quieres cancelar la visita?'
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
