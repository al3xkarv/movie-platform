import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/']);
  }
  goAllMovies() {
    this.router.navigate(['/allmovies']);
  }
  goFavoriteMovies() {
    this.router.navigate(['/favoritemovies']);
  }
  goAccountDetails() {
    this.router.navigate(['/accountdetails']);
  }

  logout() {
    this.authenticationService.logout();
  }
}
