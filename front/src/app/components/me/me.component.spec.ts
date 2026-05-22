import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeComponent } from './me.component';
import { SessionService } from '../../core/service/session.service';
import { UserService } from '../../core/service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userService: UserService;
  let sessionService: SessionService;
  let router: Router;
  const mockUser = {
    id: 1,
    email: 'john@test.com',
    lastName: 'Doe',
    firstName: 'John',
    admin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {

    const sessionServiceMock = {

      sessionInformation: {
        id: 1,
        admin: false
      },

      logOut: jest.fn()
    };

    const userServiceMock = {

      getById: jest.fn().mockReturnValue(
        of(mockUser)
      ),

      delete: jest.fn().mockReturnValue(
        of(void 0)
      )
    };

    const routerMock = {
      navigate: jest.fn()
    };

    const matSnackBarMock = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [MeComponent],

      providers: [

        {
          provide: SessionService,
          useValue: sessionServiceMock
        },

        {
          provide: UserService,
          useValue: userServiceMock
        },

        {
          provide: Router,
          useValue: routerMock
        },

        {
          provide: MatSnackBar,
          useValue: matSnackBarMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);

    component = fixture.componentInstance;

    userService = TestBed.inject(UserService);

    sessionService = TestBed.inject(SessionService);

    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should load user informations', () => {

    expect(component.user).toEqual(mockUser);
  });

  it('should display user email', () => {

    expect(component.user?.email)
      .toEqual('john@test.com');
  });

  it('should delete user account', () => {

    component.delete();

    expect(userService.delete)
      .toHaveBeenCalledWith('1');

    expect(sessionService.logOut)
      .toHaveBeenCalled();

    expect(router.navigate)
      .toHaveBeenCalledWith(['/']);
  });
});
