import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { UserService } from '../_services';
import { User } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, asapScheduler } from 'rxjs';

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

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // this.getUser();
    // this.updateForm = this.formBuilder.group({
    //   firstname: [this.user.firstname, Validators.required],
    //   lastname: [this.user.lastname, Validators.required],
    //   username: [this.user.username, Validators.required],
    //   password: [this.user.password, Validators.required],
    // });
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.updateForm.patchValue(user);
    });

    // source.toPromise().then(x => console.log('toPromise', x));
  }

  // get firstname(){}
  get f() {
    return this.updateForm.controls;
  }

  // get firstname(){

  // }
  // getUser() {}

  update() {
    let dirtyValues = {};

    Object.keys(this.updateForm.controls).forEach((key) => {
      let currentControl = this.updateForm.controls[key];

      if (currentControl.dirty) {
        dirtyValues[key] = currentControl.value;
      } else {
      }
    });
    console.log(dirtyValues);

    this.authenticationService
      .updateUser(dirtyValues)
      .pipe()
      .subscribe({
        next: () => {},
      });
    // this.getUser();
  }
}
