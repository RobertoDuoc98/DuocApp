import { TestBed } from '@angular/core/testing';

import { IngresoGuardGuard } from './ingreso-guard.guard';

describe('IngresoGuardGuard', () => {
  let guard: IngresoGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IngresoGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
