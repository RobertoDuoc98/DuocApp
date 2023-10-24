import { TestBed } from '@angular/core/testing';

import { InicioGuardGuard } from './inicio-guard.guard';

describe('InicioGuardGuard', () => {
  let guard: InicioGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InicioGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
