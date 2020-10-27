import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { ConfirmPasswordValidator } from '../_helpers/reenter-validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

  //TODO add error manipulation + if status is ok also login
  onSubmit() {
    const user = this.registerForm.value;
    delete user.rePassword;
    this.authenticationService
      .register(user)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
          //also login logic goes here
        },
      });
  }

  goLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
