import { TestBed } from '@angular/core/testing';

import { TimeofftrackerService } from './timeofftracker.service';

describe('TimeofftrackerService', () => {
  let service: TimeofftrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeofftrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
