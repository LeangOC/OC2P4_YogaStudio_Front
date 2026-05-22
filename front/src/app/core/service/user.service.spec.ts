import { expect } from '@jest/globals';

import { TestBed } from '@angular/core/testing';

import {

  HttpClientTestingModule,

  HttpTestingController

} from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {

  let service: UserService;

  let httpMock: HttpTestingController;

  const mockUser = {

    id: 1,

    email: 'john@test.com',

    firstName: 'John',

    lastName: 'Doe',

    admin: false,

    createdAt: new Date(),

    updatedAt: new Date()
  };

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(UserService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();
  });

  it('should create', () => {

    expect(service).toBeTruthy();
  });

  it('should return user by id', () => {

    service.getById('1')
      .subscribe((user) => {

        expect(user)
          .toEqual(mockUser);
      });

    const req = httpMock.expectOne(
      'api/user/1'
    );

    expect(req.request.method)
      .toBe('GET');

    req.flush(mockUser);
  });

  it('should delete user', () => {

    service.delete('1')
      .subscribe((response) => {

        expect(response)
          .toBeUndefined();
      });

    const req = httpMock.expectOne(
      'api/user/1'
    );

    expect(req.request.method)
      .toBe('DELETE');

    req.flush(null);
  });
});
