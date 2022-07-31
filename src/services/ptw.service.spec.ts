/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PtwService } from './ptw.service';

describe('Service: Ptw', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PtwService]
    });
  });

  it('should ...', inject([PtwService], (service: PtwService) => {
    expect(service).toBeTruthy();
  }));
});
