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

	updateField(uid, field) {
		return this.dbService.updateDocument(field, 'users', uid);
	}

	delete(uid: string) {
		return this.dbService.deleteDocument<DatabaseUser>('users', uid);
	}

	async getUserRole() {
		const item = JSON.parse(localStorage.getItem('user'));
		const user = await this.getUserByUid(item.uid).pipe(first()).toPromise();
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

	getAllPatients() {
		return this.dbService.getDocumentsWithOneWhere<DatabaseUser>(
			'users',
			'role',
			'==',
			'patient'
		);
	}
}
