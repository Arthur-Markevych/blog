import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  user:User;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.authService.emailSignup(
        formData.value.email,
        formData.value.password,
        formData.value.firstName,
        formData.value.lastName
      )
      
      // .then(res => {
      //   this.user = res as User;
         
      //   this.addFormData(formData.value.firstName, formData.value.lastName);
      //   // this.userService.newUser(this.user);
      //   console.log('this.userService.newUser(this.user)', this.user);
      //   this.router.navigate(['/profile']);
      // })


      // .catch(error => console.log('can\'t sign up', error));
    }
  }

  addFormData(
    firstname:string,
    lastname:string
  ){
    this.user.firstname = firstname,
    this.user.lastname = lastname
  }

}
