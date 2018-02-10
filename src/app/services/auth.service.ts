import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { User } from '../models/User';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from './user.service';



@Injectable()
export class AuthService {

  private user:Observable<User>;
  // private _userObs:Observable<User>;
  private _user:User;
  private currentUserId:string;
  

  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private router:Router
  ) { 
        this.user = this.afAuth.authState.switchMap(user => {
          if(user){
            this._user = user;
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return Observable.of(null);
          }
        });

       this.user.subscribe(user => this._user = user);
    }
    
  getCurrentUserId(){
    return this._user.uid;
  }  

  getCurrent_User() {
    return this._user;
  }

  getCurrentUser(){
    return this.user;
  }
  
  getAuthState() {
    if(this.user != Observable.of(null)){
      return true
    } else {
      return false;
    }
  }

  login(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
      console.log('Nice, it worked');
      this.router.navigate(['/profile']);
    })
  }

  emailSignup(email:string, password:string, firstname:string, lastname:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        const data: User = {
          uid: userData.uid,
          firstname: firstname,
          lastname: lastname,
          displayName: firstname + ' ' + lastname,
          email: userData.email
        }
        this.updateUserData(data)
        .then(() => this.router.navigate(['/profile']))
      }).catch(error => console.log('can\'t sign up', error))
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user)
      .then( () => this.router.navigate(['/profile']))
    })
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User ={
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    
    return userRef.set(data);
  }

}
