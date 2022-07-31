import { Attendee } from './../assets/models/attendee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs';
import { GameLibraryDto, PtwTxn } from './../assets/models/game-lib';
import { Injectable } from '@angular/core';
import { GameLibraryService } from './GameLibrary.service';
import { AttendeesService } from './Attendees.service';

@Injectable({
  providedIn: 'root'
})
export class PtwService {

  private _attendees!: Attendee[];
  private _ptwLibrary!: GameLibraryDto[];
  private _ptwTxn!: PtwTxn[];

  public readonly headers = new HttpHeaders({ 'content-type': 'application/json' });

  public get attendees(): Attendee[] {
    return this._attendees;
  }

  public get ptwLibrary(): GameLibraryDto[] {
    return this._ptwLibrary;
  }

  public set attendees(attendee: Attendee[]) {
    this._attendeeService.getAll().pipe(take(1)).subscribe((data: Attendee[]) => {
      this._attendees = data;
    })

  }
  public set ptwLibrary(library: GameLibraryDto[]) {
    this._gameService.ptwLibrary$.pipe(take(1)).subscribe((data: GameLibraryDto[]) => {
      this._ptwLibrary = data;
    });
  }

  constructor(
    private _attendeeService: AttendeesService,
    private _http: HttpClient,
    private _gameService: GameLibraryService,
  ) {
    this.ptwLibrary = [];
    this.attendees = [];
  }

  public getAllPtwTxn() {
    return this._http.get('getPtwTxn', { headers: this.headers });
  }

  public getPtwLibrary() {
    return this._gameService.getPtwLibrary();
  }
}
