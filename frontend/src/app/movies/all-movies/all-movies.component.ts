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
  searchForm: FormGroup;
  addForm: FormGroup;
  updateForm: FormGroup;

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMovies();

    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });

    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateReleased: ['', Validators.required],
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

  updateMovie(
    title: string,
    description: string,
    dateReleased: string,
    id: string
  ) {
    let dirtyValues = {};

    Object.keys(this.updateForm.controls).forEach((key) => {
      let currentControl = this.updateForm.controls[key];

      if (currentControl.dirty) {
        // if (currentControl.controls)
        //     dirtyValues[key] = this.getDirtyValues(currentControl);
        // else
        dirtyValues[key] = currentControl.value;
      }
    });
    for (const key in dirtyValues) {
      console.log(key);
      console.log(dirtyValues[key]);
      if (dirtyValues.hasOwnProperty('title')) {
        if (dirtyValues[key] == title) {
          // deleteFromObject('checkbox_description', myObject);
          delete dirtyValues[key];
        }
        // your logic here
      }
    }
    // const ddirtyValues = filter(dirtyValues, ) filter(dirtyValues, (_, fruit) => fruit.title==title);
    console.log(dirtyValues);

    this.moviesService.updateMovie(dirtyValues, id).subscribe();
    // next: () => {
    //   // this.router.navigate(['../dashboard'], { relativeTo: this.route });
    // },
    this.updateForm.reset();

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

  get u() {
    return this.updateForm.controls;
  }

  get a() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.searchMovies(this.f.search.value);
  }
}
