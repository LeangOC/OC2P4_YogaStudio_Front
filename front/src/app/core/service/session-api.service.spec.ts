import { expect } from '@jest/globals';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionApiService } from './session-api.service';

describe('SessionApiService', () => {
  let service: SessionApiService;
  let httpMock: HttpTestingController;
  const mockSession = {

    id: 1,

    name: 'Yoga Session',

    description: 'Yoga description',

    date: new Date(),

    teacher_id: 1,

    users: [1],

    createdAt: new Date(),

    updatedAt: new Date()
  };

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(SessionApiService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();
  });

  it('should create', () => {

    expect(service).toBeTruthy();
  });

  it('should return all sessions', () => {

    const mockSessions = [mockSession];

    service.all().subscribe((sessions) => {

      expect(sessions).toEqual(mockSessions);
    });

    const req = httpMock.expectOne(
      'api/session'
    );

    expect(req.request.method)
      .toBe('GET');

    req.flush(mockSessions);
  });

  it('should return session by id', () => {

    service.detail('1').subscribe((session) => {

      expect(session).toEqual(mockSession);
    });

    const req = httpMock.expectOne(
      'api/session/1'
    );

    expect(req.request.method)
      .toBe('GET');

    req.flush(mockSession);
  });

  it('should create session', () => {

    service.create(mockSession).subscribe((session) => {

      expect(session).toEqual(mockSession);
    });

    const req = httpMock.expectOne(
      'api/session'
    );

    expect(req.request.method)
      .toBe('POST');

    req.flush(mockSession);
  });

  it('should update session', () => {

    service.update('1', mockSession)
      .subscribe((session) => {

        expect(session).toEqual(mockSession);
      });

    const req = httpMock.expectOne(
      'api/session/1'
    );

    expect(req.request.method)
      .toBe('PUT');

    req.flush(mockSession);
  });

  it('should delete session', () => {

    service.delete('1').subscribe((response) => {

      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(
      'api/session/1'
    );

    expect(req.request.method)
      .toBe('DELETE');

    req.flush(null);
  });

  it('should participate to session', () => {

    service.participate('1', '1')
      .subscribe((response) => {

        expect(response).toBeUndefined();
      });

    const req = httpMock.expectOne(
      'api/session/1/participate/1'
    );

    expect(req.request.method)
      .toBe('POST');

    req.flush(null);
  });

  it('should unParticipate from session', () => {

    service.unParticipate('1', '1')
      .subscribe((response) => {

        expect(response).toBeUndefined();
      });

    const req = httpMock.expectOne(
      'api/session/1/participate/1'
    );

    expect(req.request.method)
      .toBe('DELETE');

    req.flush(null);
  });
});
