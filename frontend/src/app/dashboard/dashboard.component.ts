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
      .subscribe((user) => {
        this.username = user.username;
      });
  }

  ngOnInit() {}
}
