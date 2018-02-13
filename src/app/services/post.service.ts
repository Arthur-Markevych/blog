import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Post } from '../models/Post';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable()
export class PostService {

  private usersPostCollection:AngularFirestoreCollection<Post>;
  private publicPostCollection:AngularFirestoreCollection<Post>;
  private postDoc:AngularFirestoreDocument<Post>;
  private user:User;
  // private user:Observable<User>;
  private userId:string;


  constructor(
    private afs:AngularFirestore,
    private authService:AuthService,
    private userService:UserService
  ) {
    this.userId = this.authService.getCurrent_User().uid;

    // this.usersPostCollection = this.afs.collection<Post>(`posts`);
    this.usersPostCollection = this.afs.collection<Post>(`posts`, ref => ref.where('userId', '==', this.userId));

    this.publicPostCollection = this.afs.collection<Post>('posts', ref => ref.where('public', '==', true));
   
  }
   

  addPost(post:Post){
    return this.afs.collection(`posts`).add(post);
  }

  udatePost(post:Post) {
    this.postDoc = this.afs.doc(`posts/${post.uid}`);
     return this.postDoc.update(post);
  }

  deletePost(post:Post) {
    this.postDoc = this.afs.doc(`posts/${post.uid}`)
    this.postDoc.delete().then(_post => console.log('post deleted', post))
    .catch(err => console.log(err))
  }

  getUsersPosts(){
    return this.usersPostCollection;
  }

  getPublicPosts(){
    return this.publicPostCollection;
  }



}
