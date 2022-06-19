import { Component, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-check-out',
  templateUrl: './game-check-out.component.html',
  styleUrls: ['./game-check-out.component.scss']
})
export class GameCheckOutComponent implements OnInit {

  public barcode = faBarcode;
  public barcodeColor: FaIconComponent["styles"] = { color: 'white' }
  public barcodeErr!: string;

  constructor() { }

  ngOnInit() {
  }

}
