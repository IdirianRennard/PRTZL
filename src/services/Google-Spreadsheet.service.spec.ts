/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleSpreadsheetService } from './Google-Spreadsheet.service';

describe('Service: GoogleSpreadsheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleSpreadsheetService]
    });
  });

  it('should ...', inject([GoogleSpreadsheetService], (service: GoogleSpreadsheetService) => {
    expect(service).toBeTruthy();
  }));
});
