import { Component } from '@angular/core';
import { Visit } from 'src/app/domain/intefaces';
import { DatabaseService } from 'src/app/services/database.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-solicitar',
	templateUrl: 'solicitar.page.html',
	styleUrls: ['solicitar.page.scss'],
})
export class SolicitarPage {
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
	constructor(
		private visitService: VisitService,
		private databaseService: DatabaseService
	) {}

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
