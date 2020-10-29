import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    })
  );

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(MoviesService);
  // });

  it('should be created', () => {
    const service: MoviesService = TestBed.inject(MoviesService);
    expect(service).toBeTruthy();
  });
});
