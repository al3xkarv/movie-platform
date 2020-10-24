import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Movie } from '../../_models/Movie';
import { MoviesService } from '../../_services/movies.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css'],
})
export class FavoriteMoviesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  panelOpenState = false;
  title: string;
  description: string;
  dateReleased: string;
  movies: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
    // this.getActors();
  }

  ngOnChanges() {}

  getFavoriteMovies(): void {
    this.moviesService
      .getFavoriteMovies('')
      .subscribe((movies) => (this.movies = movies));
  }
}
