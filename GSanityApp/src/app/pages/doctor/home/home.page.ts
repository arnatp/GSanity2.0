import { Component, OnInit } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/domain/intefaces';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public visits: Observable<Visit[]>;
	sf: Visit[];
	constructor(private visitService: VisitService) {}

	ngOnInit() {
		var today;
		var date = new Date();
		today = date.getUTCFullYear() + '-';
		if ((date.getUTCMonth() + 1).toString().length == 1) {
			today += '0';
		}
		today += date.getUTCMonth() + 1;

		today += '-' + date.getUTCDate();
		this.visits = this.visitService.getTodayVisitsByDoctorUid(
			JSON.parse(localStorage.getItem('user')).uid,
			today
		);
	}
	// Change current month/week/day
}
