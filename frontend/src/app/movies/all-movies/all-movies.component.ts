import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Movie } from '../../_models/Movie';
import { FavoriteMovie } from '../../_models/favoritemovie';
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
  favoriteMovies: FavoriteMovie[];
  favoriteMoviesTemp: FavoriteMovie[];
  //  = {id:"", title: "",
  // description: "",
  // dateReleased: "",
  // favoriteId: ""};
  // array: object[];

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
    this.getFavoriteMovies();
  }

  getFavoriteMovies() {
    this.moviesService
      .getFavoriteMovies('')
      .subscribe((movies) => (this.favoriteMovies = movies));
  }
  // heartIcon(id:string){

  // }
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
}
