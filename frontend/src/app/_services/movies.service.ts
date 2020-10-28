import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from '../_models/movie';
import { FavoriteMovieCorrelation } from '../_models/favoritemoviecorrelation';

import { environment } from '../../environments/environment';
import { FavoriteMovie } from '../_models/favoritemovie';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  title: string;
  constructor(private http: HttpClient) {}

  getMovies(title?: string) {
    return this.http.get<Movie[]>(
      `${environment.apiUrl}/movies?title=${title}`
    );
  }

  getFavoriteMovies(title?: string) {
    return this.http.get<FavoriteMovie[]>(
      `${environment.apiUrl}/users/favorites?title=${title}`
    );
  }

  favoriteMovie(id: string) {
    return this.http.post<FavoriteMovieCorrelation>(
      `${environment.apiUrl}/users/favorites`,
      {
        movieId: id,
      }
    );
  }

  addMovie(title: string, description: string, dateReleased: string) {
    return this.http
      .post<Movie>(`${environment.apiUrl}/movies`, {
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
      .put<Movie>(`${environment.apiUrl}/movies/${id}`, movieUpdate)
      .pipe(
        map((updatedMovie) => {
          return updatedMovie;
        })
      );
  }

  deleteMovie(id: string) {
    return this.http.delete<Movie>(`${environment.apiUrl}/movies/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteFavoriteMovie(id: string) {
    return this.http
      .delete<FavoriteMovieCorrelation>(
        `${environment.apiUrl}/users/favorites/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDetails(id: string) {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
  }
}
