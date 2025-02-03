import { TestBed } from '@angular/core/testing';

import { FormAuthorizathionService } from './form-authorizathion.service';

describe('FormAuthorizathionService', () => {
  let service: FormAuthorizathionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAuthorizathionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
