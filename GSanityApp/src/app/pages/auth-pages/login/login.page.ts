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
		const user = await this.authSvc.login(email.value, password.value);
		if (user) {
			this.redirectUser(user.emailVerified);
		}
	}

	redirectUser(isVerified: boolean) {
		if (isVerified) {
			this.router.navigate(['patient']);
		} else {
			this.router.navigate(['/verify-email']);
		}
	}
}
