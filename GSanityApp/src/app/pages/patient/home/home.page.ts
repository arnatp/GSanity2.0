import { VisitService } from './../../../services/visit.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	public visits: Observable<Visit[]>;
	constructor(
		private visitService: VisitService,
		private userService: UserService
	) {}
	ngOnInit() {
		this.visits = this.visitService.geVisitsByPatientUid(
			JSON.parse(localStorage.getItem('user')).uid
		);
	}

}
