import { RegSubmit } from './../assets/models/reg';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public postNewReg(reg: RegSubmit): any {
    console.log("NATE >>>> \t postNewReg.Reg = ", reg);
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const body = JSON.stringify(reg);
    return this.http.post('postReg', body, { 'headers': headers }).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
}
