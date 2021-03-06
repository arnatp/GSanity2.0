import { IonDatetime } from '@ionic/angular';

export interface User {
	//Variables generales para poder auténticar mediante Firebase Authentication
	uid: string;
	email: string;
	displayName: string;
	emailVerified: boolean;
}

export interface DatabaseUser {
	//Variables generales para poder auténticar mediante Firebase Authentication
	uid: string;
	email: string;

	//Variables custom para nuestra App
	name: string;
	surnames: string;
	bornDate: Date;
	dni: string;
	mediCard: string;
	gender: string;
	role: string;
}
export interface Visit {
	id: string;
	date: IonDatetime;
	time: string;
	completed: boolean;
	dated: boolean;
	initialDescription: Text;
	resolution: Text;
	prescription: Prescription;
	patientUid: string;
	doctorUid: string;
}
export interface Prescription {
	medicamentName: string;
	quantity: number;
	schedule: Text;
}
