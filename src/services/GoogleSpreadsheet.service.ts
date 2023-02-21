import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleCredentials } from 'src/assets/models/google';

@Injectable({
  providedIn: 'root'
})
export class GoogleSpreadsheetService {

  private _sheetId = '1dHLqoKq_Cfe979FCK7e_48oFujrBNMYdSEdlicpcsYY';

  private _url = `https://spreadsheets.google.com/feeds/list/${this._sheetId}/${''}/public/values?alt=json`;
  public book!: any;

  public readonly headers = new HttpHeaders({ 'content-type': 'application/json' });

  private _cred!: GoogleCredentials;

  constructor() {

  }

}
