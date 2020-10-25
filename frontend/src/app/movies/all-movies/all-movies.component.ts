import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Movie } from '../../_models/Movie';
import { FavoriteMovie } from '../../_models/favoritemovie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  // title: string;

  // description: string;
  // dateReleased: string;
  movies: Movie[];
  favoriteMovies: FavoriteMovie[];
  favoriteMoviesTemp: FavoriteMovie[];
  searchForm: FormGroup;
  addForm: FormGroup;
  updateForm: FormGroup;
  // private searchTerms = new Subject<string>();

  //  = {id:"", title: "",
  // description: "",
  // dateReleased: "",
  // favoriteId: ""};
  // array: object[];

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

    // this.movies = this.searchTerms.pipe(
    //   debounceTime(300), // wait for 300ms pause in events
    //   distinctUntilChanged(), // ignore if next search term is same as previous
    //   switchMap(
    //     term =>
    //       term // switch to new observable each time
    //         ? // return the http search observable
    //           this.heroSearchService.search(term)
    //         : // or the observable of empty heroes if no search term
    //           of<Hero[]>([])
    //   ),
    //   catchError(error => {
    //     // TODO: real error handling
    //     console.log(`Error in component ... ${error}`);
    //     return of<Hero[]>([]);
    //   })
    // );
    // this.getActors();
  }

  ngOnChanges() {}

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

  // search(term: string): void {
  // Push a search term into the observable stream.
  //   this.searchTerms.next(term);
  // }

  // search(searchTerm) {
  //   this.movies = this.movies.filter((movie) =>
  //     movie.title.includes(searchTerm)
  //   );
  // }

  addMovie() { // title:string, description:string, dateReleased:string
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

  updateMovie(title: string, description: string, dateReleased: string) {}

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
