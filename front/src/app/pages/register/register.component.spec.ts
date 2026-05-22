import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';



describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {

    const authServiceMock = {
      register: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);

    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;

    router = TestBed.inject(Router) as jest.Mocked<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user', () => {

    authService.register.mockReturnValue(of(void 0));

    component.form.setValue({
      email: 'john@test.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456'
    });

    component.submit();

    expect(authService.register).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle register error', () => {

    authService.register.mockReturnValue(
      throwError(() => new Error('Register failed'))
    );

    component.form.setValue({

      email: 'john@test.com',

      firstName: 'John',

      lastName: 'Doe',

      password: '123456'
    });

    component.submit();

    expect(authService.register)
      .toHaveBeenCalled();

    expect(component.onError)
      .toBeTruthy();
  });
});
