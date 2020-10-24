import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/_models/Movie';
import { MoviesService } from '../../_services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  movie: Movie;
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {
    // this.param2 = params['param2'];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    console.log(this.id);
    this.moviesService.getDetails(this.id).subscribe((movie) => {
      this.movie = movie;
      console.log(movie);
    });
    console.log('wait');
    console.log(this.movie);
    console.log('what');
  }
}
