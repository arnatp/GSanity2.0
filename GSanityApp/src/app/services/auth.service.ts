import { Injectable } from '@angular/core';
import { User } from '../domain/intefaces';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { ToastService } from 'src/app/services/toast.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user$: Observable<User>;

	constructor(
		private toastService: ToastService,
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore
	) {}

	public isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return user !== null && user.emailVerified !== false ? true : false;
	}

	async resetPassword(email: string): Promise<void> {
		try {
			return this.afAuth.sendPasswordResetEmail(email);
		} catch (error) {
			console.log('Ha ocurrido un error al resetear la password: ', error);
			this.toastService.presentToast('toast.errorResetPassword');
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
			this.toastService.presentToast('toast.errorVerifyMail');
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
			this.toastService.presentToast('toast.errorRegister');
		}
	}

	async login(email: string, password: string): Promise<User> {
		try {
			const { user } = await this.afAuth.signInWithEmailAndPassword(
				email,
				password
			);
			await this.updateUserData(user);
			localStorage.setItem('user', JSON.stringify(user));
			return user;
		} catch (error) {
			console.log('Ha ocurrido un error al hacer login: ', error);
			this.toastService.presentToast('toast.errorLogin');
		}
	}

	async logout(): Promise<void> {
		try {
			return await this.afAuth.signOut().then(() => {
				localStorage.removeItem('user');
			});
		} catch (error) {
			console.log('Ha ocurrido un error al hacer logout: ', error);
			this.toastService.presentToast('toast.errorLogout');
		}
	}

	async hire(email: string, password: string): Promise<User> {
		try {
			const { user } = await this.afAuth.createUserWithEmailAndPassword(
				email,
				password
			);
			await this.resetPassword(email);
			this.toastService.presentValidToast('toast.confirmNewUserCreated');
			return user;
		} catch (error) {
			console.log('Ha ocurrido un error al hacer registro: ', error);
			this.toastService.presentToast('toast.errorRegister');
		}
	}

	async changeEmail(
		currentEmail: string,
		currentPassword: string,
		email: string
	) {
		try {
			const { user } = await this.afAuth.signInWithEmailAndPassword(
				currentEmail,
				currentPassword
			);
			user
				.updateEmail(email)
				.then(() => {
					this.toastService.presentValidToast('toast.newMailChanged');
				})
				.catch(() => {
					this.toastService.presentToast('toast.errorChangeMail');
				});
		} catch (error) {
			console.log('Ha ocurrido un error al cambiar el mail: ', error);
			this.toastService.presentToast('toast.errorChangeMail');
		}
	}

	async changePassword(
		currentEmail: string,
		currentPassword: string,
		newPassword: string
	) {
		try {
			const { user } = await this.afAuth.signInWithEmailAndPassword(
				currentEmail,
				currentPassword
			);
			user
				.updatePassword(newPassword)
				.then(() => {
					this.toastService.presentValidToast(
						'toast.confirmNewPasswordChanged'
					);
				})
				.catch(() => {
					this.toastService.presentToast('toast.errorChangePassword');
				});
		} catch (error) {
			console.log(currentEmail, currentPassword, newPassword);
			console.log('Ha ocurrido un error al cambiar la password: ', error);
			this.toastService.presentToast('toast.errorChangePassword');
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
