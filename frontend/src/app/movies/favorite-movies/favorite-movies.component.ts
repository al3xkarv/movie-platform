import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Movie } from '../../_models/movie';
import { FavoriteMovie } from '../../_models/favoritemovie';
import { MoviesService } from '../../_services/movies.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css'],
})
export class FavoriteMoviesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  panelOpenState = false;

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
    this.moviesService
      .getFavoriteMovies(title)
      .subscribe((movies) => (this.favoriteMovies = movies));
  }

  deleteFavoriteMovie(id: string) {
    this.moviesService
      .deleteFavoriteMovie(id)
      .subscribe(
        (deletedMovie) =>
          (this.favoriteMovies = this.favoriteMovies.filter(
            (movie) => deletedMovie.id !== movie.favoriteId
          ))
      );
  }
}
