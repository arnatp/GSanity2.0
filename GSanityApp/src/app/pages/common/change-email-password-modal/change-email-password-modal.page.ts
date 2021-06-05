import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CustomFormValidations } from 'src/app/validations/customformvalidations';
import { ValidationMessages } from 'src/app/validations/validation-messages';

@Component({
	selector: 'app-change-email-password-modal',
	templateUrl: './change-email-password-modal.page.html',
	styleUrls: ['./change-email-password-modal.page.scss'],
})
export class ChangeEmailPasswordModalPage implements OnInit {
	public mode;

	emailForm: FormGroup;
	passwordForm: FormGroup;
	isSubmitted = false;
	validationMessages;

	constructor(
		public modalController: ModalController,
		public authService: AuthService,
		public formBuilder: FormBuilder
	) {}

	get errorControl() {
		return this.emailForm.controls;
	}

	ngOnInit() {
		if (this.mode === 'email') {
			this.validationMessages =
				ValidationMessages.validationFormNewEmailMessages();
		} else {
			this.validationMessages =
				ValidationMessages.validationFormNewPasswordMessages();
		}
		this.emailForm = this.formBuilder.group(
			{
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
				newEmail: [
					'',
					[
						Validators.required,
						Validators.pattern(
							// eslint-disable-next-line max-len
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						),
					],
				],
				confirmNewEmail: [
					'',
					[
						Validators.required,
						Validators.pattern(
							// eslint-disable-next-line max-len
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						),
					],
				],
			},
			{
				validators: CustomFormValidations.validateNewEmail.bind(this),
			}
		);
		this.passwordForm = this.formBuilder.group(
			{
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
				currentPassword: [
					'',
					[
						Validators.required,
						Validators.minLength(8),
						/*Validators.pattern(
							'(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
						),*/
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
				validators: CustomFormValidations.validatePasswords.bind(
					this.passwordForm
				),
			}
		);
	}
	async dimiss() {
		await this.modalController.dismiss();
	}

	submitEmailForm() {
		this.isSubmitted = true;
		if (!this.emailForm.valid) {
			return false;
		} else {
			this.authService.changeEmail(
				this.emailForm.value.email,
				this.emailForm.value.password,
				this.emailForm.value.newEmail
			);
			this.dimiss();
		}
	}

	submitPasswordForm() {
		this.isSubmitted = true;
		if (!this.passwordForm.valid) {
			return false;
		} else {
			this.authService.changePassword(
				this.passwordForm.value.email,
				this.passwordForm.value.currentPassword,
				this.passwordForm.value.password
			);
			this.dimiss();
		}
	}
}
