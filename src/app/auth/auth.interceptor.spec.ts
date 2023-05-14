import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { Router } from '@angular/router';

describe('AuthInterceptor', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header with bearer token', () => {
    const token = 'dummy_token';
    spyOn(authService, 'getToken').and.returnValue(token);

    httpClient.get('/api/some-route').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('/api/some-route');
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should logout and navigate to login page on 401 error', () => {
    spyOn(authService, 'logout');
    spyOn(TestBed.inject(Router), 'navigate');

    httpClient.get('/api/some-route').subscribe(
      response => {
        // do nothing
      },
      error => {
        expect(error.status).toBe(401);
      }
    );

    const httpRequest = httpMock.expectOne('/api/some-route');
    httpRequest.flush('', { status: 401, statusText: 'Unauthorized' });

    expect(authService.logout).toHaveBeenCalled();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['login']);
  });
});
