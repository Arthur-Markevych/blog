import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { SingupComponent } from './view/singup/singup.component';
import { ProfileComponent } from './view/profile/profile.component';



// Services Imports
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service' ;



// Modules Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { NavbarComponent } from './view/navbar/navbar.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { PostComponent } from './view/post/post.component';
import { PostsComponent } from './view/posts/posts.component';
import { FlashMessagesModule } from 'angular2-flash-messages';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SingupComponent,
    ProfileComponent,
    NavbarComponent,
    PostComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Blog'),
    AngularFireAuthModule,
    MaterializeModule,
    FlashMessagesModule.forRoot()
    
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    LoginGuard,
    UserService,
    AngularFirestore,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
