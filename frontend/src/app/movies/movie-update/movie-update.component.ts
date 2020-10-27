import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../_services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../_models/Movie';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'],
})
export class MovieUpdateComponent implements OnInit {
  id: string;
  movie: Movie;

  updateForm: FormGroup;
  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateReleased: ['', Validators.required],
    });
    this.moviesService.getDetails(this.id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.updateForm.patchValue(movie);
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err);
      },
    });
  }
  get f() {
    return this.updateForm.controls;
  }

  updateMovie() {
    let dirtyValues = {};

    Object.keys(this.updateForm.controls).forEach((key) => {
      let currentControl = this.updateForm.controls[key];

      if (currentControl.dirty) {
        dirtyValues[key] = currentControl.value;
      }
    });
    for (const key in dirtyValues) {
      if (dirtyValues.hasOwnProperty('title')) {
        if (dirtyValues[key] == this.movie.title) {
          delete dirtyValues[key];
        }
      }
    }

    this.moviesService.updateMovie(dirtyValues, this.id).subscribe();
    this.router.navigate(['/allmovies']);
  }
}
