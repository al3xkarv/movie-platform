import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { UserService } from '../_services';
import { Location } from '@angular/common';
import { User } from '../_models';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  updateForm: FormGroup;
  // public currentUser: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // const
    // this.user = this.authenticationService.currentUserValue.user;
    this.getUser();
    // this.userService
    // .getUser()
    // .subscribe((user) => {
    //   // this.loading = false;
    //   console.log(user);
    //   console.log('testng dashboard get');
    //   // console.log(user)
    //   // this.user = user;
    //   this.user = user;
    // });

    console.log(this.user);
    // console.log(user);
    // this.firstname = this.user.firstname;
    this.updateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // console.log(this.firstname);
  }

  get f() {
    return this.updateForm.controls;
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      // this.loading = false;
      console.log(user);
      console.log('testng dashboard get');
      // console.log(user)
      // this.user = user;
      this.user = user;
    });
  }
  goBack(): void {
    // this.firstname = '';
    // this.lastname = '';
    // this.username = '';
    // this.newPassword = '';
    this.location.back();
  }

  update() {
    let dirtyValues = {};

    Object.keys(this.updateForm.controls).forEach((key) => {
      let currentControl = this.updateForm.controls[key];

      if (currentControl.dirty) {
        // if (currentControl.controls)
        //     dirtyValues[key] = this.getDirtyValues(currentControl);
        // else
        dirtyValues[key] = currentControl.value;
      } else {
      }
    });
    console.log(dirtyValues);

    // console.log(this.user);
    this.authenticationService
      .updateUser(dirtyValues)
      .pipe()
      .subscribe({
        next: () => {
          // this.router.navigate(['../dashboard'], { relativeTo: this.route });
        },
      });
    this.getUser();
  }
}
