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
  }
  //TODO use Movie interface
  addMovie(title: string, description: string, dateReleased: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/movies`, {
        title: title,
        description: description,
        dateReleased: dateReleased,
      })
      .pipe(
        map((movie) => {
          return movie;
        })
      );
  }

  updateMovie(movieUpdate, id) {
    return this.http
      .put<any>(`${environment.apiUrl}/movies/${id}`, movieUpdate)
      .pipe(
        map((updatedMovie) => {
          return updatedMovie;
        })
      );
  }

  deleteMovie(id: string) {
    console.log(id);
    return this.http.delete<any>(`${environment.apiUrl}/movies/${id}`).pipe(
      map((res) => {
        console.log(res);
        return res;
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
