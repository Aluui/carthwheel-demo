import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { routing } from './app.routing';
import { RegisterComponent } from './register';
import { AuthenticationService, AlertService, UserService, ToastService } from './_services';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './_components';
import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
import { UserComponent } from './users/users.component';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AlertComponent,
    RegisterComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    routing,
    ToastyModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    AlertService,
    UserService,
    AuthGuard,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
