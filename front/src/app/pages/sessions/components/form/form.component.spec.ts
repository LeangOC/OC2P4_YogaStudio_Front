
import { expect } from '@jest/globals';
/// <reference types="jest" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { SessionApiService } from '../../../../core/service/session-api.service';
import { TeacherService } from '../../../../core/service/teacher.service';
import { SessionService } from '../../../../core/service/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiService: SessionApiService;
  let router: Router;
  const mockTeachers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const mockSession = {
    id: 1,
    name: 'Yoga Session',
    description: 'Yoga description',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {

    const sessionApiServiceMock = {

      create: jest.fn().mockReturnValue(
        of(mockSession)
      ),

      update: jest.fn().mockReturnValue(
        of(mockSession)
      ),

      detail: jest.fn().mockReturnValue(
        of(mockSession)
      )
    };

    const teacherServiceMock = {

      all: jest.fn().mockReturnValue(
        of(mockTeachers)
      )
    };

    const sessionServiceMock = {

      sessionInformation: {
        admin: true
      }
    };

    const routerMock = {

      navigate: jest.fn(),

      url: 'sessions/create'
    };

    const matSnackBarMock = {

      open: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [FormComponent],

      providers: [

        {
          provide: SessionApiService,
          useValue: sessionApiServiceMock
        },

        {
          provide: TeacherService,
          useValue: teacherServiceMock
        },

        {
          provide: SessionService,
          useValue: sessionServiceMock
        },

        {
          provide: Router,
          useValue: routerMock
        },

        {
          provide: MatSnackBar,
          useValue: matSnackBarMock
        },

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue('1')
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);

    component = fixture.componentInstance;

    sessionApiService = TestBed.inject(SessionApiService);

    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {

    component.sessionForm?.setValue({
      name: '',
      date: '',
      teacher_id: '',
      description: ''
    });

    expect(component.sessionForm?.invalid)
      .toBeTruthy();
  });

  it('should create session', () => {

    component.sessionForm?.setValue({
      name: 'Yoga Session',
      date: '2024-01-01',
      teacher_id: 1,
      description: 'Yoga description'
    });

    component.submit();

    expect(sessionApiService.create)
      .toHaveBeenCalled();

    expect(router.navigate)
      .toHaveBeenCalledWith(['sessions']);
  });

  it('should update session', () => {

    component.onUpdate = true;

    component.sessionForm?.setValue({
      name: 'Updated Session',
      date: '2024-01-01',
      teacher_id: 1,
      description: 'Updated description'
    });

    component.submit();

    expect(sessionApiService.update)
      .toHaveBeenCalled();
  });

  it('should load session on update mode', () => {
    (router as any).url = 'sessions/update/1';
    component.ngOnInit();
    expect(sessionApiService.detail)
      .toHaveBeenCalledWith('1');
  });
});
