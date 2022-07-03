import { TestBed } from '@angular/core/testing';

import { CanLoadEmployeeGuard } from './can-load-employee.guard';

describe('CanLoadEmployeeGuard', () => {
  let guard: CanLoadEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
