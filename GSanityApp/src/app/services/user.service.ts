import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { DatabaseUser, User } from '../domain/intefaces';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private dbService: DatabaseService) {}

	create(user: DatabaseUser) {
		return this.dbService.createDocument<DatabaseUser>(
			user,
			'users',
			user.uid
		);
	}

	getUsers() {
		return this.dbService.getDocuments<DatabaseUser>('users');
	}

	getUserByUid(uid) {
		return this.dbService.getDocumentById<DatabaseUser>('users', uid);
	}

	update(uid, user: DatabaseUser) {
		return this.dbService.editDocument<DatabaseUser>(user, 'users', user.uid);
	}

	delete(uid: string) {
		return this.dbService.deleteDocument<DatabaseUser>('users', uid);
	}

	async getUserRole() {
		const item = JSON.parse(localStorage.getItem('user'));
		console.log(item.uid);
		const user = await this.getUserByUid(item.uid).pipe(first()).toPromise();
		console.log(user.role);
		return user.role;
	}

	getAllEmployeeUsers() {
		return this.dbService.getDocumentsWithOneWhere<DatabaseUser>(
			'users',
			'role',
			'!=',
			'patient'
		);
	}

	getAllDoctors() {
		return this.dbService.getDocumentsWithOneWhere<DatabaseUser>(
			'users',
			'role',
			'==',
			'doctor'
		);
	}
}
