import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PtwTxn } from 'src/assets/models/game-lib';
import { PtwService } from 'src/services/ptw.service';

@Component({
  selector: 'app-ptw-drawing',
  templateUrl: './ptw-drawing.component.html',
  styleUrls: ['./ptw-drawing.component.scss']
})
export class PtwDrawingComponent implements OnInit {

  public ptwTxnList!: PtwTxn[];
  constructor(private _ptwService: PtwService) { }

  ngOnInit() {
    this._ptwService.ptwTxn().pipe(take(1)).subscribe((ptwTxns: any) => {
      this.ptwTxnList = ptwTxns;
      console.log(this.ptwTxnList);
    })
  }

}
