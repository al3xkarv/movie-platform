import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MovieDetailsComponent } from './movie-details.component';
import {
  ActivatedRoute,
  ActivatedRouteStub,
  asyncData,
  click,
} from '../../../testing';
import { RouterTestingModule } from '@angular/router/testing';
////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      // imports: [ActivatedRoute],
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [MovieDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => activatedRoute.setParamMap({ id: 99999 }));

  // the `id` value is irrelevant because ignored by service stub
  // beforeEach(() =>
  // activatedRoute.setParamMap({ id: 99999 }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
