import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { MovieUpdateComponent } from './movie-update.component';
// import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; // import { HttpClientModule } from '@angular/common/http';
import {
  ActivatedRoute,
  ActivatedRouteStub,
  asyncData,
  click,
} from '../../../testing';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;

describe('MovieUpdateComponent', () => {
  let component: MovieUpdateComponent;
  let fixture: ComponentFixture<MovieUpdateComponent>;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MovieUpdateComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
