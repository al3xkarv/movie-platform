import { Component, OnInit } from '@angular/core';
import { Movie } from '../../_models/Movie';
import { FavoriteMovie } from '../../_models/favoritemovie';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { MoviesService } from '../../_services/movies.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
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
        this.favoriteArray = movies.map(() => false);
      }
    });

    this.getFavoriteMovies();
  }

  getFavoriteMovies() {
    this.moviesService.getFavoriteMovies('').subscribe((favMovies) => {
      this.favoriteMovies = favMovies;
      for (let favMovie of favMovies) {
        const i = this.movies.findIndex(
          (movie) => movie.title == favMovie.title
        );
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

    this.getMovies();
    this.favoriteArray.push(false);
  }

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe({
      next: (deletedMovie) => {
        const i = this.movies.findIndex((movie) => movie.id == deletedMovie.id);
        this.favoriteArray.splice(i, 1);
        this.movies.splice(i, 1);
      },
      complete: () => this.getMovies(),
    });
  }

  searchMovies(title) {
    this.moviesService.getMovies(title).subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err);
      },
    });

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
        },
      });
    } else {
      const favoriteMoviesTemp: FavoriteMovie[] = this.favoriteMovies.filter(
        (movie) => movie.id == id
      );
      this.moviesService
        .deleteFavoriteMovie(favoriteMoviesTemp[0].favoriteId)
        .subscribe({
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
