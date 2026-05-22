import { expect } from '@jest/globals';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './core/service/auth.service';
import { SessionService } from './core/service/session.service';

describe('AppComponent', () => {

  let sessionService: SessionService;

  let router: Router;

  beforeEach(async () => {

    const authServiceMock = {};

    const sessionServiceMock = {

      $isLogged: jest.fn().mockReturnValue(
        of(true)
      ),

      logOut: jest.fn()
    };

    const routerMock = {

      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [AppComponent],

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

    sessionService = TestBed.inject(SessionService);

    router = TestBed.inject(Router);
  });

  it('should create the app', () => {

    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;

    expect(app)
      .toBeTruthy();
  });

  it('should return logged status', (done) => {

    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;

    app.$isLogged()
      .subscribe((isLogged) => {

        expect(isLogged)
          .toBeTruthy();

        expect(sessionService.$isLogged)
          .toHaveBeenCalled();

        done();
      });
  });

  it('should logout user', () => {

    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;

    app.logout();

    expect(sessionService.logOut)
      .toHaveBeenCalled();

    expect(router.navigate)
      .toHaveBeenCalledWith(['']);
  });
});
