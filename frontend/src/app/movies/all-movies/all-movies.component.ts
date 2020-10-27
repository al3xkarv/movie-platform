import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Movie } from '../../_models/Movie';
import { FavoriteMovie } from '../../_models/favoritemovie';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

import { MoviesService } from '../../_services/movies.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  submitted = false;
  panelOpenState = false;
  movies: Movie[];
  favoriteMovies: FavoriteMovie[];
  favoriteMoviesTemp: FavoriteMovie[];

  addForm: FormGroup;
  searchForm = new FormGroup({
    search: new FormControl('', []),
  });

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMovies();

    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });

    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateReleased: ['', Validators.required],
    });
  }

  getMovies(): void {
    this.moviesService
      .getMovies('')
      .subscribe((movies) => (this.movies = movies));
    this.getFavoriteMovies();
  }

  getFavoriteMovies() {
    this.moviesService
      .getFavoriteMovies('')
      .subscribe((movies) => (this.favoriteMovies = movies));
  }

  addMovie() {
    this.moviesService
      .addMovie(
        this.a.title.value,
        this.a.description.value,
        this.a.dateReleased.value
      )
      .subscribe();
    // next: () => {
    //   // this.router.navigate(['../dashboard'], { relativeTo: this.route });
    // },
    this.getMovies();
  }

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe((deletedMovie) => {
      // this.favoriteMovies = this.favoriteMovies.filter(
      //   (movie) => deletedMovie.id !== movie.favoriteId);
      this.movies = this.movies.filter((movie) => deletedMovie.id !== movie.id);
    });
    this.getMovies();
  }

  searchMovies(title) {
    this.moviesService
      .getMovies(title)
      .subscribe((movies) => (this.movies = movies));
    this.getFavoriteMovies();
  }

  favorite(id: string) {
    this.moviesService.favoriteMovie(id).subscribe();
    // (favoriteId) => this.array.push(favoriteId)
    // ();
    this.getFavoriteMovies();
    // console.log(this.array);
  }

  unfavorite(id: string) {
    // const tempMovie: FavoriteMovie= {};
    this.favoriteMoviesTemp = this.favoriteMovies.filter(
      (movie) => movie.id == id
    );
    this.moviesService
      .deleteFavoriteMovie(this.favoriteMoviesTemp[0].favoriteId)
      .subscribe();
    // (deletedMovie) =>
    //   (this.favoriteMovies = this.favoriteMovies.filter(
    //     (movie) => deletedMovie.id !== movie.favoriteId
    //   ))
    // ();
    this.getFavoriteMovies();
  }

  get f() {
    return this.searchForm.controls;
  }

  get a() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.searchMovies(this.f.search.value);
  }
}
