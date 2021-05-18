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
	constructor(private authSvc: AuthService, private router: Router) {}

	ngOnInit() {}

	async onLogin(email, password) {
		await this.authSvc.login(email.value, password.value).then((user) => {
			if (user) {
				this.redirectUser(user.emailVerified);
			}
		});
	}

	redirectUser(isVerified: boolean) {
		if (isVerified) {
			this.router.navigate(['/']);
		} else {
			this.router.navigate(['/verify-email']);
		}
	}
}
