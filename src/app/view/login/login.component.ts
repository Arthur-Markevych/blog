import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessageService:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.authService.login(
        formData.value.email,
        formData.value.password
      ).catch((err) => {
        this.flashMessageService.show(err, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/login']);
      });
    }
  }

  loginGoogle() {
    this.authService.googleLogin().then(res => {
      console.log('logged in', res);
      this.router.navigateByUrl('/profile')
    })
    .catch((err) => {
      this.flashMessageService.show(err, {cssClass: 'alert-danger', timeout: 5000});
      this.router.navigate(['/login']);
    })
  }

}
