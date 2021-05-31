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
		this.visits = this.visitService.getVisitsAssignedToDoctorByUid(
			JSON.parse(localStorage.getItem('user')).uid
		);
	}

	clickTab(event: Event, tab: string) {
		event.stopImmediatePropagation();
		this.router.navigate([`${'doctor/'}${tab}`]);
	}
}
