
import { expect } from '@jest/globals';


import { TestBed } from '@angular/core/testing';

import {

  HttpClientTestingModule,

  HttpTestingController

} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {

  let service: AuthService;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AuthService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();
  });

  it('should create', () => {

    expect(service)
      .toBeTruthy();
  });

  it('should login user', () => {

    const mockRequest = {

      email: 'john@test.com',

      password: '123456'
    };

    const mockResponse = {

      token: 'token',

      type: 'Bearer',

      id: 1,

      username: 'john@test.com',

      firstName: 'John',

      lastName: 'Doe',

      admin: false
    };

    service.login(mockRequest)
      .subscribe((response) => {

        expect(response)
          .toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      '/api/auth/login'
    );

    expect(req.request.method)
      .toBe('POST');

    expect(req.request.body)
      .toEqual(mockRequest);

    req.flush(mockResponse);
  });

  it('should register user', () => {

    const mockRegisterRequest = {

      email: 'john@test.com',

      firstName: 'John',

      lastName: 'Doe',

      password: '123456'
    };

    service.register(mockRegisterRequest)
      .subscribe((response) => {

        expect(response)
          .toBeUndefined();
      });

    const req = httpMock.expectOne(
      '/api/auth/register'
    );

    expect(req.request.method)
      .toBe('POST');

    expect(req.request.body)
      .toEqual(mockRegisterRequest);

    req.flush(null);
  });
});
