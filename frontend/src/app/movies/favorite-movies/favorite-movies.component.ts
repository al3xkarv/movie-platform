import { Component, OnInit, ViewChild } from '@angular/core';
import { FavoriteMovie } from '../../_models/favoritemovie';
import { MoviesService } from '../../_services/movies.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css'],
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: FavoriteMovie[];
  searchForm = new FormGroup({
    search: new FormControl('', []),
  });

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  ngOnChanges() {}

  getFavoriteMovies(): void {
    this.moviesService
      .getFavoriteMovies('')
      .subscribe((movies) => (this.favoriteMovies = movies));
  }

  searchMovies(title) {
    this.moviesService.getFavoriteMovies(title).subscribe({
      next: (movies) => {
        this.favoriteMovies = movies;
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err);
      },
    });
  }

  deleteFavoriteMovie(id: string) {
    this.moviesService.deleteFavoriteMovie(id).subscribe({
      next: (deletedMovie) => {
        this.favoriteMovies = this.favoriteMovies.filter(
          (movie) => deletedMovie.id !== movie.favoriteId
        );
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err);
      },
    });
  }
}
