import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
		private userService: UserService
	) {}

	async canActivate() {
		// return true;
		if (!this.authService.isLoggedIn()) {
			console.log('no esta logeado');
			return true;
		} else {
			await this.userService.getUserRole().then((role) => {
				this.router.navigate([role]);
				return false;
			});
		}
	}
}
