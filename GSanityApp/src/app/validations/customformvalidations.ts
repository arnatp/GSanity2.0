import { FormGroup } from '@angular/forms';

export class CustomFormValidations {
	static checkDNI(form: FormGroup) {
		if (form.value) {
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
	}

	static checkBornDate(form: FormGroup) {
		if (form.value) {
			const today = new Date();
			const datePicked = form.value;
			const datePickedInDateFormat = new Date(datePicked);
			if (datePickedInDateFormat > today) {
				return { dateInvalid: true };
			}
			return null;
		}
	}

	static checkVisitDate(form: FormGroup) {
		if (form.value) {
			const today = new Date();
			today.setDate(today.getDate() - 1);
			const twoWeeksAhead = new Date(Date.now() + 12096e5);
			const datePicked = form.value;
			const datePickedInDateFormat = new Date(datePicked);
			if ([6, 0].includes(datePickedInDateFormat.getUTCDay())) {
				return { dateWeekends: true };
			}
			if (datePickedInDateFormat <= today) {
				return { datePrevious: true };
			}
			if (datePickedInDateFormat > twoWeeksAhead) {
				return { datePosterior: true };
			}
			return null;
		}
	}

	static validatePasswords(form: FormGroup) {
		const { value: password } = form.get('password');
		const { value: confirmPassword } = form.get('confirmPassword');
		return password === confirmPassword ? null : { passwordNotMatch: true };
	}

	static validateNewEmail(form: FormGroup) {
		const { value: oldEmail } = form.get('newEmail');
		const { value: newEmail } = form.get('confirmNewEmail');
		return oldEmail === newEmail ? null : { newEmailNotMatch: true };
	}
}
