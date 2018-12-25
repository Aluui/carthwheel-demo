import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { log } from 'util';

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
  submitted = false;
  termsOfServicesAccepted = false;
  showPassword = false;
  showConfirmPassword = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { 
        //// redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
      this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).then(
          data => {
            //console.log('Registration Data returned is: ', data);
            this.alertService.success('Login successful', true);
            this.router.navigate(['']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
    }
}
