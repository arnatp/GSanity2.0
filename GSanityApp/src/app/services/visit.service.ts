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
		console.log(newVisit);
		this.dataBaseService.createDocument(newVisit, 'visits', newVisit.id);
	}
	getVisitById(id: string): Observable<Visit> {
		return this.dataBaseService.getDocumentById('visits', id);
	}
	updateVisit(visit: Visit) {
		this.dataBaseService.editDocument(visit, 'visits', visit.id);
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
	getVisitsAssignedToDoctorByUid(uid: string): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithThreeWhere(
			'visits',
			'doctorUid',
			'==',
			uid,
			'dated',
			'==',
			true,
			'completed',
			'==',
			false
		);
	}
	getNotDatedVisits(): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithOneWhere(
			'visits',
			'dated',
			'==',
			false
		);
	}
	updateVisitPrescription(prescription: any, idvisit: any) {
		this.dataBaseService.updateDocument(prescription, 'visits', idvisit);
	}
}
