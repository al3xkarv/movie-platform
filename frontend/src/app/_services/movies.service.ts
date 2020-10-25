import { Movie } from '../_models/movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  title: string;
  constructor(private http: HttpClient) {}

  getMovies(title?: string) {
    return this.http.get<any>(`${environment.apiUrl}/movies?title=${title}`);
  }

  getFavoriteMovies(title?: string) {
    return this.http.get<any>(
      `${environment.apiUrl}/users/favorites?title=${title}`
    );
  }

  favoriteMovie(id: string) {
    console.log(id);
    return this.http.post<any>(`${environment.apiUrl}/users/favorites`, {
      movieId: id,
    });
    // .pipe(
    //   map((res) => {
    //     console.log(res);
    //   })
    // );
  }

  addMovie(title: string, description: string, dateReleased: string) {
    // console.log('authService');
    return this.http
      .post<any>(`${environment.apiUrl}/movies`, {
        title: title,
        description: description,
        dateReleased: dateReleased,
      })
      .pipe(
        map((movie) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return movie;
        })
      );
  }

  updateMovie(title: string, description: string, dateReleased: string) {
    return this.http
      .put<any>(`${environment.apiUrl}/users/`, {
        // {user.firstname, },
        title: title,
        description: description,
        dateReleased: dateReleased,
      })
      .pipe(
        map((updatedMovie) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          return updatedMovie;
        })
      );
  }
  deleteFavoriteMovie(id: string) {
    console.log(id);
    return this.http
      .delete<any>(`${environment.apiUrl}/users/favorites/${id}`)
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  getDetails(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/movies/${id}`);
  }
}
