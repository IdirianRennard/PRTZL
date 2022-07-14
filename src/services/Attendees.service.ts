import { Attendee } from 'src/assets/models/attendee';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttendeesService {

  private _scratchTxnList: any[] = [];

  constructor(private http: HttpClient) {
    this.getAll()
  }

  public allAttendees: Attendee[] = [];


  public getAll() {
    return this.http.get('getAttendees').pipe(
      map((res: any) => {
        this.allAttendees = Object.keys(res).map((key) => {
          return res[key];
        });
        return res;
      })
    )
  }

  public getAttendeeById(id: string): any[] {
    return this.allAttendees.filter((player: any) => player.id.toString().match(id));
  }

  public getRegTxns(barcode: string): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const queryBarcode = new HttpParams().append('barcode', barcode);
    return this.http.get('getPlayerRegTxn', { 'params': queryBarcode, 'headers': headers });
  }

  public postNewReg(reg: any): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post('postReg', reg, { 'headers': headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
