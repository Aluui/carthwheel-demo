import { Component } from '@angular/core';
import { User } from './_models';
import { Router } from '@angular/router';
import { AuthenticationService, ToastService, ToastType } from './_services';
import { environment } from '../environments/environment';
import { Promise } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  title = 'app';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {
    // this.currentUser = this.authenticationService.getUser();
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

      const tokenValid = this.userTokenIsValid(user);

      if (tokenValid) {
        tokenValid.then(
          data => {
            if (data === true) {
              // this.router.navigate(['']);
            } else {
              this.logout();
              this.router.navigate(['/login']);
            }
          }
        );
      } else {
        this.router.navigate(['/register']);
      }
    });
  }

  userTokenIsValid(user: User): Promise<boolean> {
    // let tokenIsValid = false;
    let result: Promise<boolean> = null;

    if (user && user.authData) {

      result = Promise((resolve, reject) => {
        this.authenticationService.isUserTokenValid(user.authData).then(
          isValid => {

            resolve(isValid);
          },
          error => {
            reject(error);
          });
      });
    }

    return result;
    // return tokenIsValid;
  }

  logout() {
    this.authenticationService.logout();
    this.toastService.showToastMessage('Logout successful', ToastType.Success);
    // this.router.navigate(['/register']);
  }
}
