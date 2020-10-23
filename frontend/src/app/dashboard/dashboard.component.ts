import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.css'],
})
export class DashboardComponent {
  // loading = false;
  // user: User = { firstName: 'aas', lastName: '', id: '', username: '' };
  firstName = '';
  lastName = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.userService
      .getUser()
      .pipe(first())
      .subscribe((user) => {
        // this.loading = false;
        console.log(user);
        console.log('testng dashboard get');
        // console.log(user)
        // this.user = user;
        this.firstName = user.firstname;
        this.lastName = user.lastname;
      });
  }

  ngOnInit() {
    // this.loading = true;
  }

  ngOnChanges() {
    // this.userService
    //   .getUser()
    //   .pipe(first())
    //   .subscribe((user) => {
    //     // this.loading = false;
    //     console.log(user);
    //     console.log('testng dashboard get');
    //     // console.log(user)
    //     this.user = user;
    //   });
  }
}
