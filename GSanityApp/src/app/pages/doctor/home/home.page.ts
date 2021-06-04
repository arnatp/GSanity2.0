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

	constructor(private visitService: VisitService) {}

	ngOnInit() {
		const todayDay = this.today();
		this.visits = this.visitService.getTodayVisitsByDoctorUidOrderedByTime(
			JSON.parse(localStorage.getItem('user')).uid,
			todayDay,
			'asc'
		);
	}

	today() {
		const d = new Date();
		const date = new Date();
		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		const year = d.getFullYear();

		if (month.length < 2) {
			month = '0' + month;
		}
		if (day.length < 2) {
			day = '0' + day;
		}
		return [year, month, day].join('-');
	}
}
