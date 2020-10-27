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
  submitted = false;
  panelOpenState = false;
  movies: Movie[];
  favoriteMovies: FavoriteMovie[];
  favoriteArray: boolean[] = [];
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
    this.moviesService.getMovies('').subscribe((movies) => {
      this.movies = movies;
      if (this.favoriteArray.length === 0) {
        for (let i = 0; i < movies.length; i++) {
          this.favoriteArray.push(false);
        }
      }
    });

    this.getFavoriteMovies();
  }

  getFavoriteMovies() {
    this.moviesService.getFavoriteMovies('').subscribe((movies) => {
      this.favoriteMovies = movies;
      let i = this.movies.findIndex((movie) => movie.title == movies.title);
      for (let mov of movies) {
        let i = this.movies.findIndex((movie) => movie.title == mov.title);
        if (i != -1) {
          this.favoriteArray[i] = true;
        }
      }
    });
  }

  addMovie() {
    this.moviesService
      .addMovie(
        this.a.title.value,
        this.a.description.value,
        this.a.dateReleased.value
      )
      .subscribe({
        next: () => {},
        error: (err) => console.error('something wrong occurred: ' + err),
      });
    // next: () => {
    //   // this.router.navigate(['../dashboard'], { relativeTo: this.route });
    // },
    this.getMovies();
    this.favoriteArray.push(false);
  }

  deleteMovie(id: string, i: number) {
    this.moviesService.deleteMovie(id).subscribe((deletedMovie) => {
      this.movies = this.movies.filter((movie) => deletedMovie.id !== movie.id);
    });
    this.favoriteArray.splice(i, 1);
    this.getMovies();
  }

  searchMovies(title) {
    this.moviesService
      .getMovies(title)
      .subscribe((movies) => (this.movies = movies));
    this.getFavoriteMovies();
  }

  favorite_unfavorite(id: string, i: number) {
    if (this.favoriteArray[i] == false) {
      this.moviesService.favoriteMovie(id).subscribe({
        next: () => {},
        error: (err) => console.error('something wrong occurred: ' + err),
        complete: () => {
          this.getFavoriteMovies();
          this.favoriteArray[i] = !this.favoriteArray[i];
          console.log('done');
        },
      });
    } else {
      const favoriteMoviesTemp: FavoriteMovie[] = this.favoriteMovies.filter(
        (movie) => movie.id == id
      );
      this.moviesService
        .deleteFavoriteMovie(favoriteMoviesTemp[0].favoriteId)
        .subscribe({
          next: () => {},
          error: (err) => {
            console.error('something wrong occurred: ' + err);
          },
          complete: () => {
            this.getFavoriteMovies();
            this.favoriteArray[i] = !this.favoriteArray[i];
          },
        });
    }
    this.getMovies();
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
