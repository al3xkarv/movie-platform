import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AccountDetailsComponent } from './account-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;
  let fb = new FormBuilder();
  let validUser = {
    firstname: 'alex',
    lastname: 'karv',
    username: 'alex',
    password: '1234',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AccountDetailsComponent],
      providers: [{ provide: FormBuilder, useValue: fb }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // create reusable function for a dry spec.
  function updateForm(
    userFirstName: string,
    userLastName: string,
    userUsername: string,
    userPassword: string
  ) {
    component.updateForm.controls['firstname'].setValue(userFirstName);
    component.updateForm.controls['lastname'].setValue(userLastName);
    component.updateForm.controls['username'].setValue(userUsername);
    component.updateForm.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateForm value should update from form changes', fakeAsync(() => {
    updateForm(
      validUser.firstname,
      validUser.lastname,
      validUser.username,
      validUser.password
    );
    expect(component.updateForm.value).toEqual(validUser);
  }));

  it('updateForm getter returns controls', () => {
    updateForm(
      validUser.firstname,
      validUser.lastname,
      validUser.username,
      validUser.password
    );
    expect(component.f).toEqual(component.updateForm.controls);
  });
});
