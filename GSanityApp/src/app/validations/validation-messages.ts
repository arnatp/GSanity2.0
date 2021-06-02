export class ValidationMessages {
	static validationFormRegisterMessages() {
		return {
			name: [
				{ type: 'required', message: 'errors.nameRequired' },
				{
					type: 'pattern',
					message: 'errors.namePattern',
				},
			],
			surnames: [{ type: 'required', message: 'errors.surnamesRequired' }],
			email: [
				{ type: 'required', message: 'errors.emailRequired' },
				{
					type: 'pattern',
					message: 'errors.emailPattern',
				},
			],
			gender: [{ type: 'required', message: 'errors.genderRequired' }],
			bornDate: [
				{ type: 'required', message: 'errors.bornDateRequired' },
				{
					type: 'dateInvalid',
					message: 'errors.bornDateInvalid',
				},
			],
			dni: [
				{ type: 'required', message: 'errors.dniRequired' },
				{ type: 'dniInvalid', message: 'errors.dniInvalid' },
			],
			mediCard: [
				{ type: 'required', message: 'errors.medicCardRequired' },
				{
					type: 'minlength',
					message: 'errors.medicCardInvalid',
				},
				{
					type: 'maxlength',
					message: 'errors.medicCardInvalid',
				},
			],
			password: [
				{ type: 'required', message: 'errors.passwordRequired' },
				{
					type: 'minlength',
					message: 'errors.passwordMinLength',
				},
				{
					type: 'pattern',
					message: 'errors.passwordPattern',
				},
			],
			confirmPassword: [
				{ type: 'required', message: 'errors.confirmPasswordRequired' },
			],
		};
	}

	static validationFormHireMessages() {
		return {
			name: [
				{ type: 'required', message: 'errors.nameRequired' },
				{
					type: 'pattern',
					message: 'errors.namePattern',
				},
			],
			surnames: [{ type: 'required', message: 'errors.surnamesRequired' }],
			email: [
				{ type: 'required', message: 'errors.emailRequired' },
				{
					type: 'pattern',
					message: 'errors.emailPattern',
				},
			],
			gender: [{ type: 'required', message: 'errors.genderRequired' }],
			role: [{ type: 'required', message: 'errors.roleRequired' }],
			bornDate: [
				{ type: 'required', message: 'errors.bornDateRequired' },
				{
					type: 'dateInvalid',
					message: 'errors.bornDateInvalid',
				},
			],
			dni: [
				{ type: 'required', message: 'errors.dniRequired' },
				{ type: 'dniInvalid', message: 'errors.dniInvalid' },
			],
		};
	}

	static validationFormNewEmailMessages() {
		return {
			email: [
				{ type: 'required', message: 'errors.emailRequired' },
				{
					type: 'pattern',
					message: 'errors.emailPattern',
				},
			],
			password: [
				{ type: 'required', message: 'errors.passwordRequired' },
				{
					type: 'minlength',
					message: 'errors.passwordMinLength',
				},
				{
					type: 'pattern',
					message: 'errors.passwordPattern',
				},
			],
			newEmail: [
				{ type: 'required', message: 'errors.emailRequired' },
				{
					type: 'pattern',
					message: 'errors.emailPattern',
				},
			],
			confirmNewEmail: [
				{ type: 'required', message: 'errors.emailRequired' },
				{
					type: 'pattern',
					message: 'errors.emailPattern',
				},
			],
		};
	}

	static validationFormNewPasswordMessages() {
		return {
			email: [
				{ type: 'required', message: 'errors.emailRequired' },
				{
					type: 'pattern',
					message: 'errors.emailPattern',
				},
			],
			currentPassword: [
				{ type: 'required', message: 'errors.passwordRequired' },
				{
					type: 'minlength',
					message: 'errors.passwordMinLength',
				},
				{
					type: 'pattern',
					message: 'errors.passwordPattern',
				},
			],
			password: [
				{ type: 'required', message: 'errors.passwordRequired' },
				{
					type: 'minlength',
					message: 'errors.passwordMinLength',
				},
				{
					type: 'pattern',
					message: 'errors.passwordPattern',
				},
			],
			confirmPassword: [
				{ type: 'required', message: 'errors.confirmPasswordRequired' },
			],
		};
	}

	static validationFormVisitMessages() {
		return {
			date: [
				{ type: 'required', message: 'errors.visitDateRequired' },
				{
					type: 'datePrevious',
					message: 'errors.visitDatePrevious',
				},
				{
					type: 'datePosterior',
					message: 'errors.visitDatePosterior',
				},
				{
					type: 'dateWeekends',
					message: 'errors.visitDateWeekends',
				},
			],
			doctorUid: [{ type: 'required', message: 'errors.doctorRequired' }],
			initialDescription: [
				{
					type: 'required',
					message: 'errors.initialDescriptionRequired',
				},
				{
					type: 'minlength',
					message: 'errors.InitialDescriptionMinLength',
				},
			],
		};
	}
}
