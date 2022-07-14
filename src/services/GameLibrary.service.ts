import { GameLibraryDto } from './../assets/models/game-lib';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
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

  public emptyGame: GameLibraryDto = {
    title: "",
    barcode: "",
    goodForKids: "",
    goodFor2P: "",
    players: "",
    estTime: "",
    recAge: "",
    ptw: false,
    notes: ""
  }

  public fullLibrary: GameLibraryDto[] = [];

  public get library$(): Observable<GameLibraryDto[]> {
    return this._google.get<GameLibraryDto>(this._googleSheetId, "Permanent Game Library", this._mapping);
  }
  public get ptwLibrary$(): Observable<GameLibraryDto[]> {
    return this._google.get<GameLibraryDto>(this._googleSheetId, "Play to Win", this._mapping);
  }

  constructor(private http: HttpClient, private _google: GoogleSheetsDbService) {
  }

  public getAllXOTxns(): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.get('getLibXOTxn', { 'headers': headers });
  }

  public getTxnsByAttendee(barcode: number): LibCheckoutTxn[] {
    let libTxns: LibCheckoutTxn[] = []

    this.getAllXOTxns().pipe(take(1)).subscribe((txns: LibCheckoutTxn[]) => {
      libTxns = txns.filter((txn: LibCheckoutTxn) => {
        return txn.attendee === barcode;
      });
    });

    return libTxns;
  }

  public getTxnsByGame(barcode: number): LibCheckoutTxn[] {
    let libTxns: LibCheckoutTxn[] = []

    this.getAllXOTxns().pipe(take(1)).subscribe((txns: LibCheckoutTxn[]) => {
      libTxns = txns.filter((txn: LibCheckoutTxn) => {
        return txn.game === barcode;
      });
    });

    return libTxns;
  }

  public postGameXO(reg: any): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post('postGameXO', reg, { 'headers': headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
