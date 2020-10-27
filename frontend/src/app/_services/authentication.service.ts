import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
// import { User } from '../_models/user';

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
          if (!keepLogged) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          } else {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
        })
      );
  }

  register(user) {
    return this.http.post<any>(`${environment.apiUrl}/users`, user).pipe(
      map((user) => {
        return user;
      })
    );
  }

  updateUser(valueschanged) {
    return this.http
      .put<any>(`${environment.apiUrl}/users/`, valueschanged)
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');

    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
