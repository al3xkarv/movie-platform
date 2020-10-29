import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    })
  );

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(MoviesService);
  // });

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });
});
