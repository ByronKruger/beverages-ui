import { TestBed } from '@angular/core/testing';

import { BeverageCustomisation } from './beverage-customisation';

describe('BeverageCustomisation', () => {
  let service: BeverageCustomisation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeverageCustomisation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
