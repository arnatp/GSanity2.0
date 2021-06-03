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
				this.toastService.presentValidToast('toast.confirmVisitCreated');
			});
	}
	getVisitById(id: string): Observable<Visit> {
		return this.dataBaseService.getDocumentById('visits', id);
	}
	updateVisit(visit: Visit) {
		return this.dataBaseService.editDocument(visit, 'visits', visit.id);
	}
	getVisitsCompleted(): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithOneWhere(
			'visits',
			'completed',
			'==',
			true
		);
	}
	getVisitsCompletedByUid(uid: string, order: string): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithTwoWhereAndOneOrder(
			'visits',
			'patientUid',
			'==',
			uid,
			'completed',
			'==',
			true,
			'date',
			order
		);
	}
	getTodayVisitsByDoctorUid(uid: string, today: string): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithFourWhere(
			'visits',
			'doctorUid',
			'==',
			uid,
			'date',
			'==',
			today,
			'completed',
			'==',
			false,
			'dated',
			'==',
			true
		);
	}
	getTodayVisitsByDoctorUidOrderedByTime(
		uid: string,
		today: string,
		order: string
	): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithFourWhereAndOrder(
			'visits',
			'doctorUid',
			'==',
			uid,
			'date',
			'==',
			today,
			'completed',
			'==',
			false,
			'dated',
			'==',
			true,
			'time',
			order
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
	getUpcomingVisits(uid: string): Observable<Visit[]> {
		return this.dataBaseService.getDocumentsWithTwoWhereAndTwoOrder(
			'visits',
			'patientUid',
			'==',
			uid,
			'completed',
			'==',
			false,
			'date',
			'asc',
			'time',
			'asc'
		);
	}

	deleteVisit(id: string) {
		this.dataBaseService.deleteDocument('visits', id);
	}
}
