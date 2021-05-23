import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseUser } from 'src/app/domain/intefaces';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-plantilla',
	templateUrl: './plantilla.page.html',
	styleUrls: ['./plantilla.page.scss'],
})
export class PlantillaPage implements OnInit {
	public employees: Observable<DatabaseUser[]>;
	constructor(private userService: UserService) {}

	ngOnInit() {
		this.employees = this.userService.getAllEmployeeUsers();
		console.log(this.employees);
	}
}
