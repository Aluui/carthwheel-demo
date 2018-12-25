import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models';
import { UserService } from './user.service';
import { Promise } from 'q';

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

  isUserTokenValid(token: string): Promise<boolean> {
    //return this.userService.isUserAuthenticated(token);

    let tokenValidResult = this.userService.isUserAuthenticated(token);

    return Promise((resolve, reject) => {
      tokenValidResult.subscribe(
        (isValid: boolean) => {
          resolve(isValid);
        }, error => {
          reject(error);
        }
      );
    });
  }

  login(email: string, password: string) {
    let registerResult = this.userService.login(email, password);

    return Promise((resolve, reject) => {
      registerResult.subscribe(
        user => {
          // save the user into the localstorage
          localStorage.setItem(this.currentUserString, JSON.stringify(user));
          this.currentUserSubject.next(user as User);
          resolve(true);
        }, error => {
          reject(error);
        }
      );
    });
  }

  register(user: any) {
    let newUser = new User();
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.companyName = user.companyName;
    newUser.lastName = user.lastName;
    newUser.password = user.password;

    let registerResult = this.userService.register(newUser);

    return Promise((resolve, reject) => {
      registerResult.subscribe(
        user => {
          // save the data into the localstorage
          localStorage.setItem(this.currentUserString, JSON.stringify(user));
          this.currentUserSubject.next(user as User);
          resolve(true);
        }, error => {
          reject(error);
        }
      );
    });
    
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.currentUserString);
    this.currentUserSubject.next(null);
  }
}
