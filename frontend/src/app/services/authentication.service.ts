import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

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

  //TO DO ADD RETURN TYPES

  login(username: string, password: string, keepLogged: boolean) {
    return this.http
      .post<{ user: User; jwt: string }>(`${environment.apiUrl}/users/signin`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          const storage = keepLogged ? localStorage : sessionStorage;
          storage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(user) {
    return this.http
      .post<{ user: User; jwt: string }>(`${environment.apiUrl}/users`, user)
      .pipe(map((user) => user));
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');

    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
