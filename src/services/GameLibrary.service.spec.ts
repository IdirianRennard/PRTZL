/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameLibraryService } from './GameLibrary.service';

describe('Service: GameLibrary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameLibraryService]
    });
  });

  it('should ...', inject([GameLibraryService], (service: GameLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
