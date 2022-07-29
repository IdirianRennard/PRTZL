import { Attendee } from 'src/assets/models/attendee';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttendeesService {

  private readonly headers = new HttpHeaders({ 'content-type': 'application/json' });

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

  public getAttendeeById(id: string): any {
    const queryId = new HttpParams().append('id', id);
    return this.http.get('getAttendeeById', { 'params': queryId, 'headers': this.headers });
  }

  public getAttendeeByBarcode(barcode: string): Observable<Attendee[]> {
    const queryBarcode = new HttpParams().append('barcode', barcode);
    return this.http.get<Attendee[]>('getRegAttendees', { 'params': queryBarcode, 'headers': this.headers });
  }

  public getRegTxns(barcode: string): any {
    const queryBarcode = new HttpParams().append('barcode', barcode);
    return this.http.get('getPlayerRegTxn', { 'params': queryBarcode, 'headers': this.headers });
  }

  public postNewReg(reg: any): any {
    return this.http.post('postReg', reg, { 'headers': this.headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
