import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service'
import { Post } from '../../models/Post'
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { timeout } from 'q';
import 'rxjs/add/operator/map';
import { FlashMessagesService } from 'angular2-flash-messages';

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


  constructor(
    private postService:PostService,
    private afs:AngularFirestore,
    private userService:UserService,
    private flassMessages:FlashMessagesService
  ) {  }

  ngOnInit() {

    this._posts = this.postService.getUsersPosts().snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Post;
        const uid = a.payload.doc.id;
        return {uid, ...data}
      })
    }) 

    this.post = this.getClearPost();
      
  }

  getClearPost() : Post {
    const clearPost:Post = {
      userId:'',
      title:'',
      content:'',
      public:false,
      postData: null
    }
    return clearPost;
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
      this.post = this.getClearPost();
    } else {
      this.flassMessages.show('Error' + formData.value, {cssClass:'alaert-danger', timeOut:8000})
      
    }
  }

  onEditClick(post:Post){
    this.edit = true;
    this.post = post;
  }

  onCancle(){
    this.post = {
      userId:'',
      title:'',
      content:'',
      public:false,
      postData: null
    }
    
    this.edit = false;
  }

  onDeleteClick(post:Post) {
    this.postService.deletePost(post);
  }

  addPost(post:Post){
    if(this.edit == false){
      this.postService.addPost(post).then(result => {
        this.flassMessages.show('Succcessful', {cssClass:'alert-success', timeOut:4000})
      })
      this.post = this.getClearPost();
    } else{ 
      this.postService.udatePost(post).then(result => {
        this.flassMessages.show('Succcessful', {cssClass:'alert-success', timeOut:4000})
      })
      this.edit = false;
      this.post = this.getClearPost();
    }
  
  }

}
