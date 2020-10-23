import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<any>(`${environment.apiUrl}/users/details`);
  }

  updateUser(
    user
    // firstname: string,
    // lastname: string,
    // username: string,
    // password: string
  ) {
    // return this.http.put<any>(`${environment.apiUrl}/users/`, {
    //   user,
    // firstname: firstname,
    // lastname: lastname,
    // username: username,
    // password: password,
    // })   .pipe(
    //   map((user) => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     return user;
    //   })
    // );
  }
}
