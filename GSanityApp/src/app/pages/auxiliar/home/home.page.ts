import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public user: string;
	constructor(private userServie: UserService) {}

	ngOnInit() {
		var user = this.userServie.getUserByUid(
			JSON.parse(localStorage.getItem('user')).uid
		);
		user.subscribe((user) => {
			this.user = user.name + ' ' + user.surnames;
		});
	}
}
