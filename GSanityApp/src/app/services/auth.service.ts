import { Injectable } from '@angular/core';
import { User } from '../domain/intefaces';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ToastService } from 'src/app/services/toast.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user$: Observable<User>;
	private userData: User;

	constructor(
		private toastService: ToastService,
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore
	) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.userData = user;
				localStorage.setItem('user', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('user'));
			} else {
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		});
	}

	public isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return user !== null && user.emailVerified !== false ? true : false;
	}

	async resetPassword(email: string): Promise<void> {
		try {
			return this.afAuth.sendPasswordResetEmail(email);
		} catch (error) {
			console.log('Ha ocurrido un error al resetear la password: ', error);
			this.toastService.presentToast(
				'Ha ocurrido un error al resetear la password'
			);
		}
	}

	async sendVerificationEmail(): Promise<void> {
		try {
			return (await this.afAuth.currentUser).sendEmailVerification();
		} catch (error) {
			console.log(
				'Ha ocurrido un error al enviar el mail de verificación: ',
				error
			);
			this.toastService.presentToast(
				'Ha ocurrido un error al enviar el mail de verificación'
			);
		}
	}

	async register(email: string, password: string): Promise<User> {
		try {
			const { user } = await this.afAuth.createUserWithEmailAndPassword(
				email,
				password
			);
			await this.sendVerificationEmail();
			return user;
		} catch (error) {
			console.log('Ha ocurrido un error al hacer registro: ', error);
			this.toastService.presentToast(
				'Ha ocurrido un error al hacer registro'
			);
		}
	}

	async login(email: string, password: string): Promise<User> {
		try {
			const { user } = await this.afAuth.signInWithEmailAndPassword(
				email,
				password
			);
			await this.updateUserData(user);
			return user;
		} catch (error) {
			console.log('Ha ocurrido un error al hacer login: ', error);
			this.toastService.presentToast(
				'Ha ocurrido un error al intentar iniciar sesión'
			);
		}
	}

	async logout(): Promise<void> {
		try {
			return await this.afAuth.signOut().then(() => {
				localStorage.removeItem('user');
			});
		} catch (error) {
			console.log('Ha ocurrido un error al hacer logout: ', error);
			this.toastService.presentToast('Ha ocurrido un error al hacer logout');
		}
	}

	private updateUserData(user: User) {
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(
			`users/${user.uid}`
		);

		const data: User = {
			uid: user.uid,
			email: user.email,
			emailVerified: user.emailVerified,
			displayName: user.displayName,
		};

		return userRef.set(data, { merge: true });
	}
}
