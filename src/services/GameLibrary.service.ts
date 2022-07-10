import { GameLibraryDto } from './../assets/models/game-lib';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { LibCheckoutTxn } from 'src/assets/models/game-lib';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  private _googleSheetId = "1dHLqoKq_Cfe979FCK7e_48oFujrBNMYdSEdlicpcsYY";
  private _mapping: GameLibraryDto = {
    title: 'Game',
    barcode: 'Barcode',
    goodForKids: 'Good for Kids',
    goodFor2P: 'Good for 2P',
    players: 'Players',
    estTime: 'Est Time',
    recAge: 'Ages',
    ptw: 'none',
    notes: 'Notes'
  };

  constructor(private http: HttpClient, private _google: GoogleSheetsDbService) { }

  public getAllTxns(): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.get('getLibTxn', { 'headers': headers });
  }

  public get library$() {
    return this._google.get<GameLibraryDto>(this._googleSheetId, "Permanent Game Library", this._mapping);
  };

  public get pTWLibrary$() {
    return this._google.get<GameLibraryDto>(this._googleSheetId, "Play to Win", this._mapping);
  }

  public getTxnsByAttendee(barcode: number): LibCheckoutTxn[] {
    let libTxns: LibCheckoutTxn[] = []

    this.getAllTxns().pipe(take(1)).subscribe((txns: LibCheckoutTxn[]) => {
      libTxns = txns.filter((txn: LibCheckoutTxn) => {
        return txn.attendee === barcode;
      });
    });

    return libTxns;
  }

  public getTxnsByGame(barcode: number): LibCheckoutTxn[] {
    let libTxns: LibCheckoutTxn[] = []

    this.getAllTxns().pipe(take(1)).subscribe((txns: LibCheckoutTxn[]) => {
      libTxns = txns.filter((txn: LibCheckoutTxn) => {
        return txn.game === barcode;
      });
    });

    return libTxns;
  }

}
