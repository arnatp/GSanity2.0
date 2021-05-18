import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DatabaseService {
	constructor(private angularFirestore: AngularFirestore) {}

	createDocument<DabaseObject>(data: DabaseObject, url: string, id: string) {
		const ref = this.angularFirestore.collection<any>(url);
		return ref.doc(id).set(data);
	}

	deleteDocument() {}

	getDocuments<DatabaseObject>(url: string) {
		const ref = this.angularFirestore.collection<DatabaseObject>(url);
		return ref.valueChanges();
	}

	editDocument() {}

	createCustomId() {
		return this.angularFirestore.createId();
	}

	getDocumentById<DatabaseObject>(url: string, id: string) {
		const ref = this.angularFirestore.collection<DatabaseObject>(url).doc(id);
		return ref.valueChanges();
	}
}
