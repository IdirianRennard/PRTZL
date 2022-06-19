import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { LibCheckoutTxn } from 'src/assets/models/game-lib';

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  constructor(private http: HttpClient) { }

  public getAllTxns(): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.get('getLibTxn', { 'headers': headers });
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
