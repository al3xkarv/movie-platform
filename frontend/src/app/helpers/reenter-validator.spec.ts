import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { ConfirmPasswordValidator } from './reenter-validator';

describe('ConfirmPasswordValidator', () => {
  const formGroup = new FormGroup({
    password: new FormControl('1234'),
    rePassword: new FormControl('1234'),
    falsePassword: new FormControl('12345'),
  });

  let control = formGroup.controls['password'];
  let matchingControl = formGroup.controls['rePassword'];
  let matchingControlFalse = formGroup.controls['falsePassword'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: FormGroup, useValue: formGroup }],
    }).compileComponents();
  });

  it('should set control rePasswords errors to null when passwords are the same', () => {
    expect(ConfirmPasswordValidator('password', 'rePassword')).toBeTruthy(
      matchingControl.errors == null
    );
  });

  it('should set control rePasswords errors to { confirmPasswordValidator: true } when passwords are ΝΟΤ the same', () => {
    expect(ConfirmPasswordValidator('password', 'falsePassword')).toBeTruthy(
      matchingControl.errors == { confirmPasswordValidator: true }
    );
  });

  // it('should set control rePasswords errors to null when passwords are the same', () => {
  //   expect(ConfirmPasswordValidator('password', 'rePassword')).toEqual(
  //     (formGroup) => {
  //       let control = formGroup.controls['password'];
  //       let matchingControl = formGroup.controls['rePassword'];
  //       if (
  //         matchingControl.errors &&
  //         !matchingControl.errors.confirmPasswordValidator
  //       ) {
  //         return;
  //       }
  //       if (control.value !== matchingControl.value) {
  //         matchingControl.setErrors({ confirmPasswordValidator: true });
  //       } else {
  //         matchingControl.setErrors(null);
  //       }
  //     }
  //   );
  // });
  // it('should set control rePasswords errors to null when passwords are  NOT the same', () => {
  //   expect(ConfirmPasswordValidator('password', 'falsePassword')).toEqual(
  //     (formGroup) => {
  //       let control = formGroup.controls['password'];
  //       let matchingControl = formGroup.controls['falsePassword'];
  //       if (
  //         matchingControl.errors &&
  //         !matchingControl.errors.confirmPasswordValidator
  //       ) {
  //         return;
  //       }
  //       if (control.value !== matchingControl.value) {
  //         matchingControl.setErrors({ confirmPasswordValidator: true });
  //       } else {
  //         matchingControl.setErrors(null);
  //       }
  //     }
  //   );
  // });
  // })
  // it('should set control rePasswords errors to { confirmPasswordValidator: true } when passwords are ΝΟΤ the same', () => {
  //   expect(ConfirmPasswordValidator('password', 'falsePassword')).toEqual(
  //     (formGroup) =>
  //       formGroup.controls['rePassword'].setErrors({
  //         confirmPasswordValidator: true,
  //       })
  //   );
  // });
});
