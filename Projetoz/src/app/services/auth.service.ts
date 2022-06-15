import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User } from '../pages/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(email:any,password:any) {

    return this.afa.signInWithEmailAndPassword(email,password);
  }



  logout() {
    return this.afa.signOut();

  }

  getAuth() {

  }

}
