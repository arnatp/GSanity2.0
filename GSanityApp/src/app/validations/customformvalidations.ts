import { FormGroup } from '@angular/forms';

export class CustomFormValidations {
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
		return password === confirmPassword ? null : { passwordNotMatch: true };
	}
}
