import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseUser, User } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-perfil',
	templateUrl: 'perfil.page.html',
	styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {
	user: DatabaseUser = {
		uid: null,
		bornDate: null,
		dni: null,
		email: null,
		gender: null,
		mediCard: null,
		name: null,
		role: null,
		surnames: null,
	};

	constructor(
		private userService: UserService,
		private firebase: AngularFireAuth
	) {
		this.firebase.currentUser.then((authUser) => {
			this.userService.getUserByUid(authUser.uid).subscribe((user) => {
				this.user = user;
			});
		});
	}

	ionViewWillEnter() {}
}
