import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/']);
  }
  goAllMovies() {
    this.router.navigate(['../allmovies'], { relativeTo: this.route });
  }
  goFavoriteMovies() {
    this.router.navigate(['../favoritemovies'], { relativeTo: this.route });
  }
}
