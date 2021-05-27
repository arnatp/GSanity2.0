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
		console.log(data);
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
	updateDocument<DabaseObject>(data: DabaseObject, url: string, id: string) {
		const collection = this.angularFirestore.collection<any>(url);
		return collection.doc(id).update(data);
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

	getDocumentsWithOneWhere<DatabaseObject>(
		url: string,
		field: string,
		operation: any,
		result: any
	) {
		const collection = this.angularFirestore.collection<DatabaseObject>(
			url,
			(ref) => ref.where(field, operation, result)
		);
		return collection.valueChanges();
	}

	getDocumentsWithTwoWhere<DatabaseObject>(
		url: string,
		fieldOne: string,
		operationOne: any,
		resultOne: any,
		fieldTwo: string,
		operationTwo: any,
		resultTwo: any
	) {
		const collection = this.angularFirestore.collection<DatabaseObject>(
			url,
			(ref) =>
				ref
					.where(fieldOne, operationOne, resultOne)
					.where(fieldTwo, operationTwo, resultTwo)
		);

		return collection.valueChanges();
	}
	getDocumentsWithThreeWhere<DatabaseObject>(
		url: string,
		fieldOne: string,
		operationOne: any,
		resultOne: any,
		fieldTwo: string,
		operationTwo: any,
		resultTwo: any,
		fieldTrhee: string,
		operationThree: any,
		resultThree: any
	) {
		const collection = this.angularFirestore.collection<DatabaseObject>(
			url,
			(ref) =>
				ref
					.where(fieldOne, operationOne, resultOne)
					.where(fieldTwo, operationTwo, resultTwo)
					.where(fieldTrhee, operationThree, resultThree)
		);

		return collection.valueChanges();
	}
}
