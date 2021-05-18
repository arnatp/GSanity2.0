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
		const collection = this.angularFirestore.collection<any>(url);
		return collection.doc(id).set(data);
	}

	deleteDocument<DabaseObject>(url: string, id: string) {
		const collection = this.angularFirestore.collection<any>(url);
		return collection.doc(id).delete();
	}

	getDocuments<DatabaseObject>(url: string) {
		const collection = this.angularFirestore.collection<DatabaseObject>(url);
		return collection.valueChanges();
	}

	editDocument<DabaseObject>(data: DabaseObject, url: string, id: string) {
		const collection = this.angularFirestore.collection<any>(url);
		return collection.doc(id).set(data);
	}

	//Este método lo utilizamos para crear las Id de las visitas
	createCustomId() {
		return this.angularFirestore.createId();
	}

	getDocumentById<DatabaseObject>(url: string, id: string) {
		const collection = this.angularFirestore
			.collection<DatabaseObject>(url)
			.doc(id);
		return collection.valueChanges();
	}
}