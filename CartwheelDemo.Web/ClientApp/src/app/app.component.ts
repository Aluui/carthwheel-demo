import { Component } from '@angular/core';
import { User } from './_models';
import { Router } from '@angular/router';
import { AuthenticationService, ToastService, ToastType } from './_services';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

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
        tokenValid.subscribe(
          (val) => {
            if (val === true) {
              // this.router.navigate(['']);
            } else {
              this.logout();
              this.router.navigate(['/login']);
            }
          },
          (error) => {
            this.logout();
            this.router.navigate(['/login']);
          }
        );
      } else {
        this.router.navigate(['/register']);
      }
    });
  }

  userTokenIsValid(user: User): Observable<boolean> {
    // let tokenIsValid = false;
    let result: Observable<boolean> = null;

    if (user && user.authData) {

      result = this.authenticationService.isUserTokenValid(user.authData);

    }

    return result;
  }

  logout() {
    this.authenticationService.logout();
    this.toastService.showToastMessage('Logout successful', ToastType.Success);
    // this.router.navigate(['/register']);
  }
}
