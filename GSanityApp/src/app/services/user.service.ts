import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseUser } from '../domain/intefaces';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(
		private ngFirestore: AngularFirestore,
		private dbService: DatabaseService
	) {}

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
		//return this.ngFirestore.collection('usersData').doc(uid).valueChanges();
		return this.dbService.getDocumentById<DatabaseUser>('users', uid);
	}

	update(uid, user: DatabaseUser) {
		//this.ngFirestore.collection('usersData').doc(uid).update(user);
	}

	delete(uid: string) {
		this.ngFirestore.doc('usersData/' + uid).delete();
	}
}
