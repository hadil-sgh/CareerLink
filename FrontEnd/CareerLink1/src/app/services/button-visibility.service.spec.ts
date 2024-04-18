import { TestBed } from '@angular/core/testing';

import { ButtonVisibilityService } from './button-visibility.service';

describe('ButtonVisibilityService', () => {
  let service: ButtonVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
