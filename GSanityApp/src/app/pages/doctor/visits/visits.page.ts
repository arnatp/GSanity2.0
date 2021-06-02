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
		const todayDay = this.today();
		console.log(todayDay);
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
