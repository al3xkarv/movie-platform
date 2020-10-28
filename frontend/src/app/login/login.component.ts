import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  isChecked = true;
  keepLogged = true;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authenticationService
      .login(this.f.username.value, this.f.password.value, this.keepLogged)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error;
        }
      );
  }
  goRegister() {
    this.router.navigate(['/register']);
  }
}
