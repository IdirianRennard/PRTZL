import { GameLibraryDto } from './../assets/models/game-lib';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { LibCheckoutTxn } from 'src/assets/models/game-lib';

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  private _headers = new HttpHeaders({ 'content-type': 'application/json' });

  // private _googleSheetId = "1dHLqoKq_Cfe979FCK7e_48oFujrBNMYdSEdlicpcsYY";
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
    // return of([]);
    return this.http.get<GameLibraryDto[]>('getGameLib', { 'headers': this._headers })
  }

  public get ptwLibrary$(): Observable<GameLibraryDto[]> {
    return of([]);
    // return this._google.get<GameLibraryDto>(this._googleSheetId, "Play to Win", this._mapping);
  }

  constructor(private http: HttpClient) {
  }

  public getAllXOTxns(): any {
    return this.http.get('getLibXOTxn', { 'headers': this._headers });
  }

  public getTxnsByAttendee(barcode: string): LibCheckoutTxn[] {
    let libTxns: LibCheckoutTxn[] = []

    this.getAllXOTxns().pipe(take(1)).subscribe((txns: LibCheckoutTxn[]) => {
      libTxns = txns.filter((txn: LibCheckoutTxn) => {
        return txn.attendee_barcode === barcode;
      });
    });

    return libTxns;
  }

  public getGameXOTxn(barcode: string): any {
    return this.http.get('getLibXOTxn/?barcode=' + barcode, { 'headers': this._headers });
  }

  public getPtwLibrary() {
    return [];
    // return this.ptwLibrary$;
  }

  public postGameXIn(reg: any): any {
    return this.http.post('postGameXIn', reg, { 'headers': this._headers });
  }

  public postGameXO(reg: any): any {
    return this.http.post('postGameXO', reg, { 'headers': this._headers });
  }

  public postPtwEntry(reg: any): any {
    return this.http.post('postPtwEntry', reg, { 'headers': this._headers });
  }

}
