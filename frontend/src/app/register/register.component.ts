import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { ConfirmPasswordValidator } from '../helpers/reenter-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  err: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        rePassword: ['', Validators.required],
      },
      { validator: ConfirmPasswordValidator('password', 'rePassword') }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    const user = this.registerForm.value;
    delete user.rePassword;
    this.authenticationService
      .register(user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.authenticationService
            .login(this.f.username.value, this.f.password.value, false)
            .subscribe({ next: () => this.router.navigate(['/']) });
        },
        error: (err) => {
          this.err = err;
        },
      });
  }
}
