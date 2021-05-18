export interface User {
	//Variables generales para poder auténticar mediante Firebase Authentication
	uid: string;
	email: string;
	displayName: string;
	emailVerified: boolean;
	//Variables custom para nuestra App
	/*bornDate: Date;
  dni: string;
  mediCard: string;
  gender: string;*/
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
