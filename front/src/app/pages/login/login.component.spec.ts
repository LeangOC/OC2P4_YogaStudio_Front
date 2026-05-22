import { expect } from '@jest/globals';


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { AuthService } from '../../core/service/auth.service';

import { SessionService } from '../../core/service/session.service';

import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {

  let component: LoginComponent;

  let fixture: ComponentFixture<LoginComponent>;

  let authService: AuthService;

  let sessionService: SessionService;

  let router: Router;

  beforeEach(async () => {

    const authServiceMock = {

      login: jest.fn()
    };

    const sessionServiceMock = {

      logIn: jest.fn()
    };

    const routerMock = {

      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [LoginComponent],

      providers: [

        {
          provide: AuthService,
          useValue: authServiceMock
        },

        {
          provide: SessionService,
          useValue: sessionServiceMock
        },

        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);

    sessionService = TestBed.inject(SessionService);

    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {

    expect(component.form.invalid)
      .toBeTruthy();
  });

  it('should have valid form', () => {

    component.form.setValue({

      email: 'test@test.com',

      password: '123456'
    });

    expect(component.form.valid)
      .toBeTruthy();
  });

  it('should login user', () => {

    const mockResponse = {

      token: 'token',

      type: 'Bearer',

      id: 1,

      username: 'test@test.com',

      firstName: 'John',

      lastName: 'Doe',

      admin: false
    };

    jest.spyOn(authService, 'login')
      .mockReturnValue(of(mockResponse));

    component.form.setValue({

      email: 'test@test.com',

      password: '123456'
    });

    component.submit();

    expect(authService.login)
      .toHaveBeenCalled();

    expect(sessionService.logIn)
      .toHaveBeenCalledWith(mockResponse);

    expect(router.navigate)
      .toHaveBeenCalledWith(['/sessions']);
  });

  it('should handle login error', () => {

    jest.spyOn(authService, 'login')
      .mockReturnValue(
        throwError(() => new Error('Login failed'))
      );

    component.form.setValue({

      email: 'wrong@test.com',

      password: 'wrongpassword'
    });

    component.submit();

    expect(authService.login)
      .toHaveBeenCalled();
  });
});
