import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  username = '';
  constructor(private userService: UserService) {
    this.userService
      .getUser()
      .pipe(first())
      .subscribe({
        next: (user) => {
          this.username = user.username;
        },
        error: (err) => {
          console.error('something wrong occurred: ' + err);
        },
      });
  }

  ngOnInit() {}
}
