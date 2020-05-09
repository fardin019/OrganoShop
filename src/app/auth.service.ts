import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './shared/models/app-user';
import 'rxjs/add/operator/switchMap';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  [x: string]: any;

  user$: Observable<firebase.User>;

  constructor(  
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
      this.user$ = afAuth.authState;
     }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem( 'returnUrl', returnUrl );
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .switchMap(user => {
        if (user) return this.userService.get(user.uid);
        
        return Observable.of(null);
    });
  }
}