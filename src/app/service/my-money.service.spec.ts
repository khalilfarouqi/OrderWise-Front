import { TestBed } from '@angular/core/testing';

import { MyMoneyService } from './my-money.service';

describe('MyMoneyService', () => {
  let service: MyMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
