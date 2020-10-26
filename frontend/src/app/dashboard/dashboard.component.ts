import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  firstName = '';
  lastName = '';
  constructor(private userService: UserService) {
    this.userService
      .getUser()
      .pipe(first())
      .subscribe((user) => {
        this.firstName = user.firstname;
        this.lastName = user.lastname;
      });
  }

  ngOnInit() {}
}
