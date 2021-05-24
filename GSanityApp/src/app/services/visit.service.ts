import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
	getVisitById(id: string): Observable<Visit> {
		return this.dataBaseService.getDocumentById('visits', id);
	}
	getVisitsCompletedByUid(uid: string): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithTwoWhere(
			'visits',
			'patientUid',
			'==',
			uid,
			'completed',
			'==',
			true
		);
	}
}
