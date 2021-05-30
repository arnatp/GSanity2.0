import { Injectable } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Visit } from '../domain/intefaces';
import { AlertService } from './alert.service';
import { DatabaseService } from './database.service';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root',
})
export class VisitService {
	constructor(
		private dataBaseService: DatabaseService,
		private toastService: ToastService
	) {}

	createVisit(newVisit: Visit) {
		return this.dataBaseService
			.createDocument(newVisit, 'visits', newVisit.id)
			.then(() => {
				this.toastService.presentValidToast(
					'Se ha creado la visita con éxito'
				);
			});
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
	getNotDatedVisitsByDoctorUid(uid: string): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithTwoWhere(
			'visits',
			'doctorUid',
			'==',
			uid,
			'dated',
			'==',
			false
		);
	}
	updateVisitPrescription(prescription: any, idvisit: any) {
		this.dataBaseService.updateDocument(prescription, 'visits', idvisit);
	}
	getVisitsByDate(date: IonDatetime, uid: string): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithThreeWhere(
			'visits',
			'date',
			'==',
			date,
			'doctorUid',
			'==',
			uid,
			'dated',
			'==',
			true
		);
	}
}
