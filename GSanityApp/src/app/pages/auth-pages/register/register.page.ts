import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
	constructor(
		private authSvc: AuthService,
		private router: Router,
		private userService: UserService
	) {}

	ngOnInit() {}

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
