import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { UserService } from '../_services';
import { Location } from '@angular/common';
import { User } from '../_models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  user;
  firstname: string;
  lastname: string;
  username: string;
  newPassword: string;
  // public currentUser: Observable<any>;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // const
    this.user = this.authenticationService.currentUserValue.user;
    // console.log(user);
    this.firstname = this.user.firstname;

    console.log(this.firstname);
  }

  goBack(): void {
    // this.firstname = '';
    // this.lastname = '';
    // this.username = '';
    // this.newPassword = '';
    this.location.back();
  }

  update() {
    console.log(this.user);
    this.authenticationService
      .updateUser(
        this.user.firstname,
        this.user.lastname,
        this.user.username,
        this.newPassword
      )
      .pipe()
      .subscribe({
        next: () => {
          // this.router.navigate(['../dashboard'], { relativeTo: this.route });
        },
      });
  }
}
