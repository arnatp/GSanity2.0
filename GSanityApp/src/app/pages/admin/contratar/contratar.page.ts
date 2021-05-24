import { Component, OnInit } from '@angular/core';
import { DatabaseUser } from 'src/app/domain/intefaces';
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
	constructor(
		private authSvc: AuthService,
		private userService: UserService
	) {}

	ngOnInit() {}

	async onContract(email) {
		//Creamos la contraseña a partir del nombre y el año de nacimiento del nuevo empleado
		const password = this.generateNewPassword();
		const employee = await this.authSvc.register(email.value, password);
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
		console.log(this.newEmployee);
		this.newEmployee.name = this.capitalizeTheFirstLetterOfEachWord(
			this.newEmployee.name
		);
		this.newEmployee.surnames = this.capitalizeTheFirstLetterOfEachWord(
			this.newEmployee.surnames
		);
		const year = new Date(this.newEmployee.bornDate);
		return (
			this.newEmployee.name.substring(0, 2) +
			this.newEmployee.surnames.substring(0, 2) +
			year.getFullYear()
		);
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
}
