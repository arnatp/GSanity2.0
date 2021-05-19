import { Injectable } from '@angular/core';
import { Visit } from '../domain/intefaces';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root',
})
export class VisitService {
	constructor(private dataBaseService: DatabaseService) {}

	createVisit(newVisit: Visit) {
		this.dataBaseService.createDocument(newVisit, 'visits', newVisit.id);
	}
}
