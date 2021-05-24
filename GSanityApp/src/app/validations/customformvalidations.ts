import { FormGroup } from '@angular/forms';

export class CustomFormValidations {
	static validationFormRegisterMessages() {
		return {
			name: [
				{ type: 'required', message: '{{errors.nameRequired}}' },
				{
					type: 'pattern',
					message: '{{errors.namePattern}}',
				},
			],
			surnames: [{ type: 'required', message: 'Surnames are required.' }],
			email: [
				{ type: 'required', message: 'Email is required.' },
				{
					type: 'pattern',
					message: 'Email format is incorrect',
				},
			],
			gender: [{ type: 'required', message: 'Gender is required.' }],
			bornDate: [{ type: 'required', message: 'Born Date is required.' }],
			dni: [
				{ type: 'required', message: 'DNI is required.' },
				{ type: 'dniInvalid', message: 'DNI format is invalid.' },
			],
			mediCard: [
				{ type: 'required', message: 'Medic Card is required.' },
				{
					type: 'minlength',
					message: 'Medic Card must contain 10 characters.',
				},
				{
					type: 'maxlength',
					message: 'Medic Card must contain 10 characters.',
				},
			],
			password: [
				{ type: 'required', message: 'Password is required.' },
				{
					type: 'minlength',
					message: 'Password must contain 8 characters at least',
				},
				{
					type: 'pattern',
					message:
						'Password must contain 1 lowercase character, 1 uppercase character, 1 number and 1 special character',
				},
			],
			confirmPassword: [
				{ type: 'required', message: 'Confirm Password is required.' },
				{ type: 'passwordNotMatch', message: 'Passwords does not match' },
			],
		};
	}

	static checkDNI(form: FormGroup) {
		let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
		const dni = form.value.toLowerCase();

		let numero = dni.substr(0, dni.length - 1);
		const letr = dni.substr(dni.length - 1, 1);
		numero = numero % 23;
		letra = letra.substring(numero, numero + 1);
		if (letra !== letr.toUpperCase()) {
			return { dniInvalid: true };
		} else {
			return null;
		}
	}

	static validatePasswords(form: FormGroup) {
		const { value: password } = form.get('password');
		const { value: confirmPassword } = form.get('confirmPassword');
		console.log(password, confirmPassword);
		console.log(
			password === confirmPassword ? null : { passwordNotMatch: true }
		);
		return password === confirmPassword ? null : { passwordNotMatch: true };
	}
}
