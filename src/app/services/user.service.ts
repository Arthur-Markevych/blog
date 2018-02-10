import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { Post } from '../models/Post';

@Injectable()
export class UserService {

  // private user:User;
  private userCollection:AngularFirestoreCollection<User>;
  private userDoc:AngularFirestoreDocument<User>;
  private user:Observable<User>
  private currentUser:User;

  constructor(
    private afs:AngularFirestore,
    private authService:AuthService
  ) {
    
      this.userDoc = this.afs.doc<User>(`users/${this.authService.getCurrentUserId()}`);
      this.user = this.userDoc.valueChanges();
      this.user.subscribe(user => this.currentUser = user)
      
    }
   

   getCurrentUser(){
     return this.currentUser;
   }

  getUserCollection(){
    return this.afs.collection('users');
  }

}
