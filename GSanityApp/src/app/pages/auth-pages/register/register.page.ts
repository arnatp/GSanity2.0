import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { AuthService } from 'src/app/services/auth.service';
import {UserService  } from 'src/app/services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	constructor(private authSvc: AuthService, private router: Router, private userService:UserService) {}

	ngOnInit() {}

	async onRegister(name, email, password,dni) {
		try {
			console.log();
			const user = await this.authSvc.register(email.value, password.value);
			const DatabaseUser : DatabaseUser={uid : user.uid,email:user.email,dni:dni};
			this.userService.create(DatabaseUser);
			if (user) {
				this.router.navigate(['/verify-email']);
			}
		} catch (error) {
			console.log('Error', error);
		}
	}
}
