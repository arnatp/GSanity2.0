export class ValidationMessages {
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
						'Password must contain 1 lowercase character, 1 uppercase character and 1 number',
				},
			],
			confirmPassword: [
				{ type: 'required', message: 'Confirm Password is required.' },
			],
		};
	}

	static validationFormHireMessages() {
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
			role: [{ type: 'required', message: 'Role is required.' }],
			bornDate: [{ type: 'required', message: 'Born Date is required.' }],
			dni: [
				{ type: 'required', message: 'DNI is required.' },
				{ type: 'dniInvalid', message: 'DNI format is invalid.' },
			],
		};
	}

	static validationFormNewEmailMessages() {
		return {
			email: [
				{ type: 'required', message: 'Email is required.' },
				{
					type: 'pattern',
					message: 'Email format is incorrect',
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
						'Password must contain 1 lowercase character, 1 uppercase character and 1 number',
				},
			],
			newEmail: [
				{ type: 'required', message: 'Email is required.' },
				{
					type: 'pattern',
					message: 'Email format is incorrect',
				},
			],
			confirmNewEmail: [
				{ type: 'required', message: 'Email is required.' },
				{
					type: 'pattern',
					message: 'Email format is incorrect',
				},
			],
		};
	}

	static validationFormNewPasswordMessages() {
		return {
			email: [
				{ type: 'required', message: 'Email is required.' },
				{
					type: 'pattern',
					message: 'Email format is incorrect',
				},
			],
			currentPassword: [
				{ type: 'required', message: 'Password is required.' },
				{
					type: 'minlength',
					message: 'Password must contain 8 characters at least',
				},
				{
					type: 'pattern',
					message:
						'Password must contain 1 lowercase character, 1 uppercase character and 1 number',
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
						'Password must contain 1 lowercase character, 1 uppercase character and 1 number',
				},
			],
			confirmPassword: [
				{ type: 'required', message: 'Confirm Password is required.' },
			],
		};
	}
}
