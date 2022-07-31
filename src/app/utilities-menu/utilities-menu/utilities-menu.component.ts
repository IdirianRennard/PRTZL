import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { faFlag, faGear } from '@fortawesome/free-solid-svg-icons';
import { Utilities } from 'src/assets/models/utilities.enum';
import { PtwDrawingComponent } from '../ptw-drawing/ptw-drawing.component';

@Component({
  selector: 'app-utilities-menu',
  templateUrl: './utilities-menu.component.html',
  styleUrls: ['./utilities-menu.component.scss']
})
export class UtilitiesMenuComponent implements OnInit {

  public readonly settings = faGear;
  public readonly utilities = faFlag;

  public menuOptions = Object.values(Utilities);

  constructor(public ptwDrawing: MatDialog) { }

  ngOnInit() {
    console.log(this.menuOptions)
  }

  public openOptionDialog(option: string) {

    console.log(option)

    switch (option) {
      case Utilities.PTW_DRAWING:
        this.ptwDrawing.open(PtwDrawingComponent)
        break;
    }
  }

}
