import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SheetsAPIService {

  private _keys!: any;


  constructor(private _http: HttpClient) {

    this._http.get<any>('../assets/settings/google-key/keys.json').pipe(take(1)).subscribe((data) => {
      this._keys = data
      console.log(this._keys);
    });

  }
}
