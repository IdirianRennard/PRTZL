import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs';
import { GameLibraryDto, PtwTxn } from './../assets/models/game-lib';
import { Injectable } from '@angular/core';
import { GameLibraryService } from './GameLibrary.service';

@Injectable({
  providedIn: 'root'
})
export class PtwService {

  private _ptwLibrary!: GameLibraryDto[];
  private _ptwTxn!: PtwTxn[];

  public readonly headers = new HttpHeaders({ 'content-type': 'application/json' });

  constructor(private _gameService: GameLibraryService, private _http: HttpClient) {
    this.ptwLibrary = [];
  }

  public get ptwLibrary(): GameLibraryDto[] {
    return this._ptwLibrary;
  }

  public ptwTxn() {
    return this._http.get('getPtwTxn', { headers: this.headers });
  }

  public set ptwLibrary(library: GameLibraryDto[]) {
    this._gameService.ptwLibrary$.pipe(take(1)).subscribe((data: GameLibraryDto[]) => {
      this._ptwLibrary = data;
    });
  }
}
