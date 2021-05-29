import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormGroupDirective,
	Validators,
} from '@angular/forms';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { ValidationMessages } from 'src/app/validations/validation-messages';
import { CustomFormValidations } from 'src/app/validations/customformvalidations';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-contratar',
	templateUrl: './contratar.page.html',
	styleUrls: ['./contratar.page.scss'],
})
export class ContratarPage implements OnInit {
	newEmployee: DatabaseUser = {
		uid: '',
		email: '',
		name: '',
		surnames: '',
		bornDate: null,
		dni: '',
		mediCard: '',
		gender: '',
		role: '',
	};
	password: string;
	hireForm: FormGroup;
	formDirective: FormGroupDirective;
	isSubmitted = false;

	validationMessages = ValidationMessages.validationFormHireMessages();

	constructor(
		public formBuilder: FormBuilder,
		private alertService: AlertService,
		private authService: AuthService,
		private userService: UserService
	) {}

	get errorControl() {
		return this.hireForm.controls;
	}

	ngOnInit() {
		this.hireForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
			surnames: ['', [Validators.required]],
			email: [
				'',
				[
					Validators.required,
					Validators.pattern(
						// eslint-disable-next-line max-len
						/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					),
				],
			],
			gender: ['', [Validators.required]],
			role: ['', [Validators.required]],
			bornDate: [
				'',
				[Validators.required, CustomFormValidations.checkBornDate],
			],
			dni: ['', [Validators.required, CustomFormValidations.checkDNI]],
		});
	}

	submitForm(formDirective: FormGroupDirective) {
		this.isSubmitted = true;
		this.formDirective = formDirective;
		if (!this.hireForm.valid) {
			return false;
		} else {
			for (const key in this.hireForm.controls) {
				if (key) {
					const control = this.hireForm.get(key);
					this.newEmployee[key] = control.value;
				}
			}
			//Hacemos que la primera letra del nombre y de los apellidos sea siempre mayuscula
			this.newEmployee.name = this.capitalizeTheFirstLetterOfEachWord(
				this.newEmployee.name
			);
			this.newEmployee.surnames = this.capitalizeTheFirstLetterOfEachWord(
				this.newEmployee.surnames
			);
			this.onFormValid();
		}
	}

	capitalizeTheFirstLetterOfEachWord(words) {
		const separateWord = words.toLowerCase().split(' ');
		for (let i = 0; i < separateWord.length; i++) {
			separateWord[i] =
				separateWord[i].charAt(0).toUpperCase() +
				separateWord[i].substring(1);
		}
		return separateWord.join(' ');
	}

	generateNewPassword() {
		return Math.random().toString(36).slice(-8);
	}

	async onFormValid() {
		//Creamos la contraseña totalmente aleatoria
		this.password = this.generateNewPassword();
		this.alertService
			.presentCustomAlert('Nuevo Empleado', '¿Todo está correcto?')
			.then((result) => {
				if (result.data) {
					this.contractEmployee();
				}
			});
	}

	contractEmployee() {
		this.authService
			.hire(this.newEmployee.email, this.password)
			.then((employee) => {
				if (employee) {
					//Añadimos el usuario a la BD con nuestros datos actualizados
					this.newEmployee.uid = employee.uid;
					this.userService.create(this.newEmployee);
					this.clearForm(this.formDirective);
				}
			});
	}

	clearForm(formDirective: FormGroupDirective) {
		this.isSubmitted = false;
		formDirective.resetForm();
		this.hireForm.reset();
	}
}
