import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

describe('UserService', () => {
  let service: AuthenticationService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthenticationService],
    })
  );

  it('should be created', () => {
    const service: AuthenticationService = TestBed.inject(
      AuthenticationService
    );
    expect(service).toBeTruthy();
  });
});
