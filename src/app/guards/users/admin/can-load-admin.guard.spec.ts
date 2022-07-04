import { TestBed } from '@angular/core/testing';

import { CanLoadAdminGuard } from './can-load-admin.guard';

describe('CanLoadAdminGuard', () => {
  let guard: CanLoadAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
