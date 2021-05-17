import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseUser } from "../domain/intefaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(    
    private ngFirestore: AngularFirestore,
    ) { }

 create(user: DatabaseUser) {
   //console.log("User: "+user.dni+","+user.uid+","+user.email);
    return this.ngFirestore.collection('usersData').add(user);
  }

  getUsers() {
    return this.ngFirestore.collection('usersData').snapshotChanges();
  }
  
  getUser(uid) {
    return this.ngFirestore.collection('usersData').doc(uid).valueChanges();
  }

  update(uid, user: DatabaseUser) {
    this.ngFirestore.collection('usersData').doc(uid).update(user)
    
  }

  delete(uid: string) {
    this.ngFirestore.doc('usersData/' + uid).delete();
  }
}