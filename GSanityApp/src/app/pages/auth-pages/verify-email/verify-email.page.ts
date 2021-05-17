import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.page.html',
	styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
	time: number;
	constructor(private authSvc: AuthService) {
		this.time = 60;
	}

	ngOnInit() {}

	onResendEmail() {
		this.authSvc.sendVerificationEmail();
		this.disableButton();
	}

	disableButton() {
		this.time = 60;
		const interval = setInterval(() => {
			this.decreaseCounter();
		}, 1000);
		(document.getElementById('button') as HTMLButtonElement).disabled = true;
		setTimeout(() => {
			this.enableButton();
			clearInterval(interval);
		}, 60000);
	}

	enableButton() {
		(document.getElementById('button') as HTMLButtonElement).disabled = false;
	}

	decreaseCounter() {
		this.time -= 1;
	}
}
