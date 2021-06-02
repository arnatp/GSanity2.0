import { VisitService } from 'src/app/services/visit.service';
import { Component, OnInit } from '@angular/core';
import { Visit } from 'src/app/domain/intefaces';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-historial',
	templateUrl: 'historial.page.html',
	styleUrls: ['historial.page.scss'],
})
export class HistorialPage implements OnInit {
	public visits: Observable<Visit[]>;
	constructor(private visitService: VisitService) {}

	ngOnInit() {
		this.visits = this.visitService.getVisitsCompletedByUid(
			JSON.parse(localStorage.getItem('user')).uid,
			'desc'
		);
	}
}
