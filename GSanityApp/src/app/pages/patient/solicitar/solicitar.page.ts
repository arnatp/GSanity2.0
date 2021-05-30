import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormGroupDirective,
	Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DatabaseUser, Visit } from 'src/app/domain/intefaces';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';
import { VisitService } from 'src/app/services/visit.service';
import { CustomFormValidations } from 'src/app/validations/customformvalidations';
import { ValidationMessages } from 'src/app/validations/validation-messages';

@Component({
	selector: 'app-solicitar',
	templateUrl: 'solicitar.page.html',
	styleUrls: ['solicitar.page.scss'],
})
export class SolicitarPage implements OnInit {
	newVisit: Visit = {
		id: '',
		date: null,
		time: '',
		completed: false,
		dated: false,
		initialDescription: null,
		resolution: null,
		prescription: null,
		patientUid: '',
		doctorUid: null,
	};
	form: FormGroup;
	isSubmitted = false;

	validationMessages = ValidationMessages.validationFormVisitMessages();

	public doctors: Observable<DatabaseUser[]>;

	constructor(
		private visitService: VisitService,
		private databaseService: DatabaseService,
		private userService: UserService,
		private formBuilder: FormBuilder
	) {}

	get errorControl() {
		return this.form.controls;
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			date: [
				'',
				[Validators.required, CustomFormValidations.checkVisitDate],
			],
			doctorUid: ['', [Validators.required]],
			initialDescription: [
				'',
				[Validators.required, Validators.minLength(10)],
			],
		});

		this.doctors = this.userService.getAllDoctors();
	}

	submitForm(formDirective: FormGroupDirective) {
		this.isSubmitted = true;
		if (!this.form.valid) {
			return false;
		} else {
			for (const key in this.form.controls) {
				if (key) {
					const control = this.form.get(key);
					this.newVisit[key] = control.value;
				}
			}
			this.create(formDirective);
		}
	}

	async create(formDirective: FormGroupDirective) {
		try {
			this.newVisit.id = this.databaseService.createCustomId();
			this.newVisit.patientUid = JSON.parse(
				localStorage.getItem('user')
			).uid;
			this.visitService.createVisit(this.newVisit).then(() => {
				this.clearForm(formDirective);
			});
		} catch (error) {
			console.log('Error', error);
		}
	}

	clearForm(formDirective: FormGroupDirective) {
		this.isSubmitted = false;
		formDirective.resetForm();
		this.form.reset();
	}
}
