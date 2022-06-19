import { RegSubmit } from './../assets/models/reg';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttendeesService {

  constructor(private http: HttpClient) { }

  public getAll() {

    return this.http.get('getAttendees').pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  public getTxns(barcode: string): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const queryBarcode = new HttpParams().append('barcode', barcode);

    return this.http.get('getPlayerRegTxn', { 'params': queryBarcode, 'headers': headers });
  }

  public postNewReg(reg: RegSubmit): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const body = JSON.stringify(reg);
    return this.http.post('postReg', body, { 'headers': headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
