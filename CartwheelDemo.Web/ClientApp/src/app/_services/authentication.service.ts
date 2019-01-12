import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
  private currentUserString = 'currentUser';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.currentUserString)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isUserTokenValid(token: string): Observable<boolean> {
    // return this.userService.isUserAuthenticated(token);

    const tokenValidResult = this.userService.isUserAuthenticated(token);

    return tokenValidResult;

  }

  login(email: string, password: string) {
    const registerResult = this.userService.login(email, password);

    registerResult.subscribe(
      (user) => {
        if (user.loginResult) {
          // save the user into the localstorage
          localStorage.setItem(this.currentUserString, JSON.stringify(user));
          this.currentUserSubject.next(user as User);
        }
      }
    );

    return registerResult;

  }

  register(user: any) {
    const newUser = new User();
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.companyName = user.companyName;
    newUser.lastName = user.lastName;
    newUser.password = user.password;

    const registerResult = this.userService.register(newUser);

    registerResult.subscribe(
      (val) => {
        // save the data into the localstorage
        localStorage.setItem(this.currentUserString, JSON.stringify(user));
        this.currentUserSubject.next(user as User);
      }
    );

    return registerResult;

  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.currentUserString);
    this.currentUserSubject.next(null);
  }
}
