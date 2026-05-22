import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

/// <reference types="jest" />

import {

  HttpClientTestingModule,

  HttpTestingController

} from '@angular/common/http/testing';



import { TeacherService } from './teacher.service';

describe('TeacherService', () => {

  let service: TeacherService;

  let httpMock: HttpTestingController;

  const mockTeacher = {

    id: 1,

    firstName: 'John',

    lastName: 'Doe',

    createdAt: new Date(),

    updatedAt: new Date()
  };

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(TeacherService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();
  });

  it('should create', () => {

    expect(service).toBeTruthy();
  });

  it('should return all teachers', () => {

    const mockTeachers = [mockTeacher];

    service.all().subscribe((teachers) => {

      expect(teachers).toEqual(mockTeachers);
    });

    const req = httpMock.expectOne(
      'api/teacher'
    );

    expect(req.request.method)
      .toBe('GET');

    req.flush(mockTeachers);
  });

  it('should return teacher by id', () => {

    service.detail('1').subscribe((teacher) => {

      expect(teacher).toEqual(mockTeacher);
    });

    const req = httpMock.expectOne(
      'api/teacher/1'
    );

    expect(req.request.method)
      .toBe('GET');

    req.flush(mockTeacher);
  });
});
