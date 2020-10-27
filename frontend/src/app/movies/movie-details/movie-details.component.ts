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
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.moviesService.getDetails(this.id).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err);
      },
    });
  }
}
