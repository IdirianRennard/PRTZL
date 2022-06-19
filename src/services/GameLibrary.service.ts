import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  constructor(private http: HttpClient) { }

  public getAllTxns(): any {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.get('getLibTxn', { 'headers': headers });
  }

}
