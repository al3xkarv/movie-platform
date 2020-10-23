import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, keepLogged: boolean) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/signin`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (!keepLogged) {
            return;
          }
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    console.log('authService');
    return this.http
      .post<any>(`${environment.apiUrl}/users`, {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  //TODO update localStorage
  updateUser(
    firstname,
    lastname,
    username,
    password
    // firstname: string,
    // lastname: string,
    // username: string,
    // password: string
  ) {
    return this.http
      .put<any>(`${environment.apiUrl}/users/`, {
        // {user.firstname, },
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
