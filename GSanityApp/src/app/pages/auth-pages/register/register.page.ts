import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { CustomFormValidations } from 'src/app/validations/customformvalidations';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	newUser: DatabaseUser = {
		uid: '',
		email: '',
		name: '',
		surnames: '',
		bornDate: null,
		dni: '',
		mediCard: '',
		gender: '',
		role: 'patient',
	};
	form: FormGroup;
	isSubmitted = false;

	validationMessages = CustomFormValidations.validationFormRegisterMessages();

	constructor(
		private authSvc: AuthService,
		private router: Router,
		private userService: UserService,
		public formBuilder: FormBuilder
	) {}

	get errorControl() {
		return this.form.controls;
	}

	ngOnInit() {
		this.form = this.formBuilder.group(
			{
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
				bornDate: ['', [Validators.required]],
				dni: ['', [Validators.required, CustomFormValidations.checkDNI]],
				mediCard: [
					'',
					[
						Validators.required,
						Validators.minLength(10),
						Validators.maxLength(10),
					],
				],
				password: [
					'',
					[
						Validators.required,
						Validators.minLength(8),
						Validators.pattern(
							'(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
						),
					],
				],
				confirmPassword: ['', [Validators.required]],
			},
			{
				validators: CustomFormValidations.validatePasswords.bind(this),
			}
		);
	}

	submitForm() {
		this.isSubmitted = true;
		if (!this.form.valid) {
			console.log('Please provide all the required values!');
			return false;
		} else {
			console.log(this.form.value);
		}
	}

	async onRegister(email, password) {
		try {
			console.log();
			const user = await this.authSvc.register(email.value, password.value);
			if (user) {
				//Añadimos el usuario a la BD con nuestros datos actualizados
				this.newUser.uid = user.uid;
				this.userService.create(this.newUser).then((_) => {
					//Envaios al User a la ventana de verificar Email cuando el usuario se añada a la base de datos
					this.router.navigate(['/verify-email']);
				});
			}
		} catch (error) {
			console.log('Error', error);
		}
	}
}
