import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationMessages } from 'src/app/validations/validation-messages';
import { CustomFormValidations } from 'src/app/validations/customformvalidations';

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
	hireForm: FormGroup;
	isSubmitted = false;

	validationMessages = ValidationMessages.validationFormHireMessages();

	constructor(
		private authSvc: AuthService,
		private userService: UserService,
		public formBuilder: FormBuilder
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
			bornDate: ['', [Validators.required]],
			dni: ['', [Validators.required, CustomFormValidations.checkDNI]],
		});
	}

	submitForm() {
		this.isSubmitted = true;
		if (!this.hireForm.valid) {
			return false;
		} else {
			for (const key in this.hireForm.controls) {
				if (key) {
					const control = this.hireForm.get(key);
					this.newEmployee[key] = control.value;
				}
			}
			console.log(this.newEmployee);
			this.onContract(this.hireForm.value.email);
		}
	}

	async onContract(email) {
		//Creamos la contraseña a partir del nombre y el año de nacimiento del nuevo empleado
		const password = this.generateNewPassword();
		const employee = await this.authSvc.hire(email, password);
		if (employee) {
			//Añadimos el usuario a la BD con nuestros datos actualizados
			this.newEmployee.uid = employee.uid;
			this.userService.create(this.newEmployee);
		}
	}
	catch(error) {
		console.log('Error', error);
	}

	generateNewPassword() {
		return Math.random().toString(36).slice(-8);
	}
}
