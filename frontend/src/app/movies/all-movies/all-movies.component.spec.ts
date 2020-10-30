import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { AllMoviesComponent } from './all-movies.component';

describe('AllMoviesComponent', () => {
  let component: AllMoviesComponent;
  let fixture: ComponentFixture<AllMoviesComponent>;
  let validSearch = { search: 'LO' };
  let validMovie = {
    title: 'LOTR',
    description: 'A fellowship',
    dateReleased: '2001-06-06T13:32',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AllMoviesComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateAddForm(
    movieTitle: string,
    movieDescription: string,
    movieDateReleased: string
  ) {
    component.addForm.controls['title'].setValue(movieTitle);
    component.addForm.controls['description'].setValue(movieDescription);
    component.addForm.controls['dateReleased'].setValue(movieDateReleased);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addForm value should update from form changes', fakeAsync(() => {
    updateAddForm(
      validMovie.title,
      validMovie.description,
      validMovie.dateReleased
    );
    expect(component.addForm.value).toEqual(validMovie);
  }));

  it('addForm getter returns controls', () => {
    updateAddForm(
      validMovie.title,
      validMovie.description,
      validMovie.dateReleased
    );
    expect(component.a).toEqual(component.addForm.controls);
  });

  function updateSearchForm(searchTerm: string) {
    component.searchForm.controls['search'].setValue(searchTerm);
  }

  it('searchForm value should update from form changes', fakeAsync(() => {
    updateSearchForm(validSearch.search);
    expect(component.searchForm.value).toEqual(validSearch);
  }));

  it('searchForm getter returns controls', () => {
    updateSearchForm(validSearch.search);
    expect(component.f).toEqual(component.searchForm.controls);
  });
});
