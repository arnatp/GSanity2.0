import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/domain/intefaces';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.page.html',
	styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
	public visits: Observable<Visit[]>;
	constructor(private router: Router, private visitService: VisitService) {}

	ngOnInit() {
		const todayDay = this.today();
		this.visits = this.visitService.getTodayVisitsByDoctorUid(
			JSON.parse(localStorage.getItem('user')).uid,
			todayDay
		);
	}

	clickTab(event: Event, tab: string) {
		event.stopImmediatePropagation();
		this.router.navigate([`${'doctor/'}${tab}`]);
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
