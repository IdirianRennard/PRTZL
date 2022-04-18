import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Attendee } from 'src/assets/models/attendee';

@Injectable({
  providedIn: 'root'
})

export class AttendeesService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get('getAttendees').pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    )
  }


}
