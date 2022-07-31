import { take } from 'rxjs';
import { GameLibraryDto } from './../assets/models/game-lib';
import { Injectable } from '@angular/core';
import { GameLibraryService } from './GameLibrary.service';

@Injectable({
  providedIn: 'root'
})
export class PtwService {

  private _ptwLibrary!: GameLibraryDto[];

  constructor(private _gameService: GameLibraryService) {
    this.ptwLibrary = [];

  }

  public get ptwLibrary(): GameLibraryDto[] {
    return this._ptwLibrary;
  }

  public set ptwLibrary(library: GameLibraryDto[]) {
    this._gameService.ptwLibrary$.pipe(take(1)).subscribe((data: GameLibraryDto[]) => {
      this._ptwLibrary = data;
    });
  }

}
