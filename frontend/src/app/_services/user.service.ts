import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<any>(`${environment.apiUrl}/users/details`);
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
}
