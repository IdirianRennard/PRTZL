import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { take } from 'rxjs';
import { GoogleCredentials } from 'src/assets/models/google';

@Injectable({
  providedIn: 'root'
})
export class GoogleSpreadsheetService {

  public book: GoogleSpreadsheet;

  public readonly headers = new HttpHeaders({ 'content-type': 'application/json' });

  private _cred!: GoogleCredentials;

  constructor(private http: HttpClient) {
    this.http.get('getGgleCredit', { headers: this.headers }).pipe(take(1)).subscribe((creds) => {
      console.log(creds);
      this._cred = creds as GoogleCredentials;
    })

    this.book = new GoogleSpreadsheet('1dHLqoKq_Cfe979FCK7e_48oFujrBNMYdSEdlicpcsYY');

    this.book.useServiceAccountAuth({
      client_email: this._cred.email,
      private_key: this._cred.appkey
    });
  }



}
