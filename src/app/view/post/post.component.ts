import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service'
import { Post } from '../../models/Post'
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { timeout } from 'q';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts:Post[];
  _posts:Observable<Post[]>;
  private edit:boolean = false;

  private post:Post;
  private emptyPost:Post = {
    uid:'',
    userId:'',
    title:'',
    content:'',
    public:false,
    postData: null
  }

  constructor(
    private postService:PostService,
    private afs:AngularFirestore,
    private userService:UserService
  ) {  }

  ngOnInit() {

    this._posts = this.postService.getUsersPosts().snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Post;
        const uid = a.payload.doc.id;
        return {uid, ...data}
      });
    }) 

    // this._posts = this.postService.getUsersPosts().snapshotChanges().map(action => {
    //   return action.map(a => {
    //     const data = a.payload.doc.data() as Post;
    //     const uid = a.payload.doc.id;
    //     return {uid, ...data}
    //   });
    // })

  
    
    // .subscribe((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log('doc', doc)
    //     // const post:Post ={
    //     //   uid: doc.uid,
    //     //   title: doc.title,
    //     //   content: doc.content,
    //     //   owner: doc.content,
    //     //   public: doc.public,
    //     //   postData: doc.postData,
    //     //   userId: doc.userId
    //     // }
    //     // console.log('Post: ', post)
    //   })
    // })

    // this._posts = this.postService.getUsersPosts().snapshotChanges().map(action => {
    //   return action.map(a => {
    //     const data = a.payload.doc.data() as Post;
    //     const id = a.payload.doc.id;
    //     return {id, ...data}
    //   })
    // });

    this.post = this.emptyPost;
      
  }

  onSubmit(formData){
    if(formData.valid){
      this.post.title = formData.value.title;
      this.post.content = formData.value.content;
      this.post.public = formData.value.isPublic;
      this.post.owner = this.userService.getCurrentUser().email;
      this.post.userId = this.userService.getCurrentUser().uid;
      this.post.postData = new Date();
      this.addPost(this.post);
      console.log('Post added', this.post);

      this.post = this.emptyPost;

    } else {
      console.log('post invalid', formData.value)
    }
  }

  onEditClick(post:Post){
    this.edit = true;
    this.post = post;
  }

  onCancle(){
    this.post = this.emptyPost;
    this.edit = false;
  }

  onDeleteClick(post:Post) {
    this.postService.deletePost(post);
  }

  addPost(post:Post){
    if(this.edit == false){
      this.postService.addPost(post);
    } else{ 
      this.postService.udatePost(post);
      this.edit = false;
    }
     this.post = this.emptyPost;
    
  }

}
