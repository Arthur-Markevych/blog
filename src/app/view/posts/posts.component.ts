import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private posts:Observable<Post[]>

  constructor(private postService:PostService, private userService:UserService, private afs:AngularFirestore) { }

  ngOnInit() {
    this.postService.getUsersPosts().snapshotChanges().subscribe(posts => this.posts = this.afs.collection(`posts`, ref => ref.where('public', '==', true)).snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Post;
        const uid = a.payload.doc.id;
        return {uid, ...data}
      })
    }));
  }

}
