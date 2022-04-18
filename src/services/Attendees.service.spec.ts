/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttendeesService } from './Attendees.service';

describe('Service: Attendees', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendeesService]
    });
  });

  it('should ...', inject([AttendeesService], (service: AttendeesService) => {
    expect(service).toBeTruthy();
  }));
});
