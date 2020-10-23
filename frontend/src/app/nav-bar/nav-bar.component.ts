import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

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
  goAccountDetails() {
    this.router.navigate(['../accountdetails'], { relativeTo: this.route });
  }

  logout() {
    this.authenticationService.logout();
  }
}
