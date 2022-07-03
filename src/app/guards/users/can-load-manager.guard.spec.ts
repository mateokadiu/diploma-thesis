import { TestBed } from '@angular/core/testing';

import { CanLoadManagerGuard } from './can-load-manager.guard';

describe('CanLoadManagerGuard', () => {
  let guard: CanLoadManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
