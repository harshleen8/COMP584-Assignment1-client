import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should send a login request and set token if successful', () => {
      const loginRequest = { username: 'testuser', password: 'testpass' };
      const loginResult = { success: true, token: 'testtoken' };


      const req = httpMock.expectOne('/api/Account');
      expect(req.request.method).toBe('POST');
      req.flush(loginResult);
    });

    it('should not set token if login request fails', () => {
      const loginRequest = { username: 'testuser', password: 'testpass' };
      const loginResult = { success: false, token: null };


      const req = httpMock.expectOne('/api/Account');
      expect(req.request.method).toBe('POST');
      req.flush(loginResult);
    });
  });

  describe('logout', () => {
    it('should remove token and set auth status to false', () => {
      authService.logout();
      expect(authService.getToken()).toBeNull();
      expect(authService.isAuthenticated()).toBeFalse();
    });
  });

  // Write similar tests for other methods in AuthService
});

