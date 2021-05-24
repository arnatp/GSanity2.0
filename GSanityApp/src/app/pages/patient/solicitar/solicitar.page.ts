import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseUser, Visit } from 'src/app/domain/intefaces';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-solicitar',
	templateUrl: 'solicitar.page.html',
	styleUrls: ['solicitar.page.scss'],
})
export class SolicitarPage implements OnInit {
	newVisit: Visit = {
		id: '',
		date: null,
		completed: false,
		dated: false,
		initialDescription: null,
		resolution: null,
		prescription: null,
		patientUid: '',
		doctorUid: null,
	};
	public doctors: Observable<DatabaseUser[]>;

	constructor(
		private visitService: VisitService,
		private databaseService: DatabaseService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.doctors = this.userService.getAllDoctors();
	}

	async create() {
		try {
			this.newVisit.id = this.databaseService.createCustomId();
			this.newVisit.patientUid = JSON.parse(
				localStorage.getItem('user')
			).uid;
			this.visitService.createVisit(this.newVisit);
		} catch (error) {
			console.log('Error', error);
		}
	}
}