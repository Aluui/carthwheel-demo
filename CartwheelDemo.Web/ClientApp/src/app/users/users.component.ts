import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { UserService } from '../_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UserComponent {
  public users: User[];

  constructor(http: HttpClient, private userService: UserService) {
    //this.users = this.userService.getAll();
    this.userService.getAll().subscribe(result => {
      //console.log('server result ', result);
      this.users = result;

    }, error => console.error(error));
  }
}
