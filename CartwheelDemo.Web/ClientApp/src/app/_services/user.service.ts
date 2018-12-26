import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { User } from '../_models';

@Injectable()
export class UserService {
  apiUrl = '';
  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;odata=verbose' })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.apiUrl = this.baseUrl + 'api/users';
    // console.log('api url ', this.apiUrl);

  }

  getAll() {
    // const url = `${this.apiUrl}/users`;
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getByEmailAndPassword(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.http.post(`${this.apiUrl}/Login`, user);
  }

  register(user: User) {
    const newUser = new User();
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.companyName = user.companyName;
    newUser.lastName = user.lastName;
    newUser.password = user.password;


    // let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.apiUrl}/register`, newUser, this.options);
  }

  login(email: string, password: string) {

    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  isUserAuthenticated(token: string) {

    return this.http.post(`${this.apiUrl}/isuserauthenticated`, JSON.stringify(token), this.options);
  }

  update(user: User) {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
