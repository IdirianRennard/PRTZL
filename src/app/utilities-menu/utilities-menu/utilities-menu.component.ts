import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { faChevronRight, faCircle, faFlag, faGear, fas } from '@fortawesome/free-solid-svg-icons';
import { Utility } from 'src/assets/models/utilityMenu';
import { take } from 'rxjs';
import { PtwDrawingComponent } from '../ptw-drawing/ptw-drawing.component';
import { HttpClient } from '@angular/common/http';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Utilities } from 'src/assets/models/utilities.enum';

@Component({
  selector: 'app-utilities-menu',
  templateUrl: './utilities-menu.component.html',
  styleUrls: ['./utilities-menu.component.scss']
})
export class UtilitiesMenuComponent implements OnInit {


  public menuOptions: Utility[] = [];
  ptwDrawing: any;

  constructor(private _http: HttpClient, public library: FaIconLibrary) {
    this._http.get<Utility[]>('getUtilMenuTabs').pipe(take(1)).subscribe((utils: Utility[]) => {
      this.menuOptions = utils;
    });

    library.addIconPacks(fas);

  }

  ngOnInit() {

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
