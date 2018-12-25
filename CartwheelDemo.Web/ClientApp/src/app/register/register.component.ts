import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { log } from 'util';

@Component({ templateUrl: 'register.component.html', styleUrls: ['register.component.scss'] })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
  submitted = false;
  termsOfServicesAccepted = false;
  showPassword = false;
  showConfirmPassword = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        //private userService: UserService,
        private alertService: AlertService
    ) { 
        //// redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
          companyName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPass: [''],
          termsAccepted: ['', Validators.required]
        }, { validators: this.checkPasswords });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = null;
    let confirmPass = null;

    console.log('group: ', group, group.controls);
    if (group && group.controls && group.controls.password && group.controls.confirmPass) {
      pass = group.controls.password.value;
      confirmPass = group.controls.confirmPass.value;
    }
    
    return pass === confirmPass ? null : { notSame: true };
  }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.registerForm.value).then(
          data => {
            //console.log('Registration Data returned is: ', data);
            this.alertService.success('Registration successful', true);
            this.router.navigate(['']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
    }
}
