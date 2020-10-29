import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  user: User;
  firstname: string;
  lastname: string;
  username: string;
  newPassword: string;
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.updateForm.patchValue(user);
    });
  }

  get f() {
    return this.updateForm.controls;
  }

  update() {
    let dirtyValues = {};

    Object.keys(this.updateForm.controls).forEach((key) => {
      let currentControl = this.updateForm.controls[key];

      if (currentControl.dirty) {
        dirtyValues[key] = currentControl.value;
      } else {
      }
    });

    this.userService
      .updateUser(dirtyValues)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['/register']);
        },
        error: (err) => {
          console.error('something wrong occurred: ' + err);
        },
      });
  }
}
