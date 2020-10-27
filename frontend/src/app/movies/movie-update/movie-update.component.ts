import { ActivatedRoute, Router } from '@angular/router';

import { MoviesService } from '../../_services/movies.service';
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

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'],
})
export class MovieUpdateComponent implements OnInit {
  id: string;
  movie: Movie;

  submitted = false;
  panelOpenState = false;
  // movies: Movie[];
  // favoriteMovies: FavoriteMovie[];
  // favoriteMoviesTemp: FavoriteMovie[];
  // searchForm: FormGroup;
  // addForm: FormGroup;
  updateForm: FormGroup;
  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.param2 = params['param2'];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateReleased: ['', Validators.required],
    });
    this.moviesService.getDetails(this.id).subscribe((movie) => {
      this.movie = movie;
      this.updateForm.patchValue(movie);
    });
  }
  get f() {
    return this.updateForm.controls;
  }

  updateMovie() {
    // id: string // dateReleased: string, // description: string, // title: string,
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
      // console.log(key);
      // console.log(dirtyValues[key]);
      if (dirtyValues.hasOwnProperty('title')) {
        if (dirtyValues[key] == this.movie.title) {
          // deleteFromObject('checkbox_description', myObject);
          delete dirtyValues[key];
        }
        // your logic here
      }
    }
    // const ddirtyValues = filter(dirtyValues, ) filter(dirtyValues, (_, fruit) => fruit.title==title);
    console.log(dirtyValues);

    this.moviesService.updateMovie(dirtyValues, this.id).subscribe();
    // next: () => {
    // },
    // this.updateForm.reset();
    this.router.navigate(['/allmovies']);
  }
}
