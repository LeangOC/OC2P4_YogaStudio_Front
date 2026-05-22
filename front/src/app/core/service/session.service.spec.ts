import { expect } from '@jest/globals';
import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';


describe('SessionService', () => {

  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });


  it('should log in user', () => {

    const user = {
      token: 'token',
      type: 'Bearer',
      id: 1,
      username: 'john',
      firstName: 'John',
      lastName: 'Doe',
      admin: false
    };

    service.logIn(user);

    expect(service.isLogged).toBeTruthy();

    expect(service.sessionInformation).toEqual(user);
  });


  it('should log out user', () => {

    service.logOut();

    expect(service.isLogged).toBeFalsy();

    expect(service.sessionInformation).toBeUndefined();
  });
});
