import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SheetsAPIService {

  private _keys!: any;

  constructor(private _http: HttpClient) {
    this._http.get<any>('../assets/settings/google-key/prtzl-eater.json').pipe(take(1)).subscribe((data) => {
      this._keys = data
      console.log(this._keys);
    });
  }

  public async accessSheet(sheetID: string) {

  };
}

