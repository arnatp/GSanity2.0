import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseUser, Visit } from 'src/app/domain/intefaces';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.page.html',
	styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
	public patients: Observable<DatabaseUser[]>;
	public visits: Observable<Visit[]>;
	public patientUid = '';
	constructor(
		private visitService: VisitService,
		private userService: UserService,
		private toastService: ToastService
	) {
		this.patients = this.userService.getAllPatients();
	}

	ngOnInit() {
		this.getCompletedVisitsByPatient();
	}

	async getCompletedVisitsByPatient() {
		this.visits = this.visitService.getVisitsCompletedByUid(
			this.patientUid,
			'desc'
		);
	}
	print(uid: string) {
		this.toastService.presentToast('Imprimir un historial no disponible');
	}
}
