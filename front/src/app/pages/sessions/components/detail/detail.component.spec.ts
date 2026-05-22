import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { SessionService } from '../../../../core/service/session.service';
import { SessionApiService } from '../../../../core/service/session-api.service';
import { TeacherService } from '../../../../core/service/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('DetailComponent', () => {

  let component: DetailComponent;

  let fixture: ComponentFixture<DetailComponent>;

  let sessionApiService: SessionApiService;

  const mockSession = {
    id: 1,
    name: 'Yoga Session',
    description: 'Test description',
    date: new Date(),
    teacher_id: 1,
    users: [1],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockTeacher = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {

    const sessionServiceMock = {
      sessionInformation: {
        admin: true,
        id: 1
      }
    };

    const sessionApiServiceMock = {
      detail: jest.fn().mockReturnValue(of(mockSession)),
      delete: jest.fn().mockReturnValue(of(void 0)),
      participate: jest.fn().mockReturnValue(of(void 0)),
      unParticipate: jest.fn().mockReturnValue(of(void 0))
    };

    const teacherServiceMock = {
      detail: jest.fn().mockReturnValue(of(mockTeacher))
    };

    const routerMock = {
      navigate: jest.fn()
    };

    const matSnackBarMock = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [DetailComponent],

      providers: [

        {
          provide: SessionService,
          useValue: sessionServiceMock
        },

        {
          provide: SessionApiService,
          useValue: sessionApiServiceMock
        },

        {
          provide: TeacherService,
          useValue: teacherServiceMock
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
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    sessionApiService = TestBed.inject(SessionApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect admin user', () => {
    expect(component.isAdmin).toBeTruthy();
  });


  it('should participate to session', () => {
    component.participate();
    expect(sessionApiService.participate)
      .toHaveBeenCalledWith('1', '1');
  });
});
