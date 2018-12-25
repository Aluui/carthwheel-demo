import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;odata=verbose' })
  };

  constructor(private http: HttpClient) { }

  getAll() {
    let url = `${environment.apiUrl}/users`;
    return this.http.get<User[]>(url);
  }

  getById(id: number) {
      return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  getByEmailAndPassword(email: string, password: string) {
    let user = new User();
    user.email = email;
    user.password = password;
    return this.http.post(`${environment.apiUrl}/users/Login`, user);
  }

  register(user: User) {
    let newUser = new User();
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.companyName = user.companyName;
    newUser.lastName = user.lastName;
    newUser.password = user.password;

    
    //let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.apiUrl}/users/register`, newUser, this.options);
  }

  login(email: string, password: string) {
    
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password });
  }

  isUserAuthenticated(token: string) {
    
    return this.http.post(`${environment.apiUrl}/users/isuserauthenticated`, JSON.stringify(token), this.options);
  }

  update(user: User) {
      return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
