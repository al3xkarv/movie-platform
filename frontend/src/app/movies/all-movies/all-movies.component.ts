import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Movie } from '../../_models/Movie';
import { MoviesService } from '../../_services/movies.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  panelOpenState = false;
  title: string;
  description: string;
  dateReleased: string;
  movies: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
    // this.getActors();
  }

  ngOnChanges() {}

  getMovies(): void {
    this.moviesService
      .getMovies('')
      .subscribe((movies) => (this.movies = movies));
  }
}
