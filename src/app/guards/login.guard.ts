import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LoginGuard implements CanActivate{

    

    constructor(
        private router:Router,
        public afAuth:AngularFireAuth
    ){ }

    

    canActivate():Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if(!auth){
                return true;;
            } else {
                this.router.navigateByUrl('/profile');
                return false;
            }
        });
    }

    
}
