import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	constructor(
		private authSvc: AuthService,
		private router: Router,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	async onLogin(email, password) {
		try {
			const user = await this.authSvc.login(email.value, password.value);
			if (user) {
				console.log('User --> ', user);
				this.redirectUser(user.emailVerified);
			}
		} catch (error) {
			console.log('Error: ', error);
			this.toastService.presentToast(
				'Ha ocurrido un error al intentar iniciar sesión',
				2000
			);
		}
	}

	redirectUser(isVerified: boolean) {
		if (isVerified) {
			this.router.navigate(['/tabs']);
		} else {
			this.router.navigate(['/verify-email']);
		}
	}
}
