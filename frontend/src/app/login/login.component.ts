import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  isChecked = true;
  keepLogged = true;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log('testing login forms');
    // this.submitted = true;
    // // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('onSubmit this form is invalid');
      return;
    }
    // this.loading = true;
    console.log(this.keepLogged);
    this.authenticationService
      .login(this.f.username.value, this.f.password.value, this.keepLogged)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/']); //{ relativeTo: this.route });
        },
        (error) => {
          this.error = error;
          console.log(error);
          this.loading = false;
        }
      );
    this.f.username.reset();
    this.f.password.reset();
  }
  goRegister() {
    this.router.navigate(['../register'], { relativeTo: this.route });
  }
}
