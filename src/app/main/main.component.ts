import { GoogleSpreadsheetService } from 'src/services/GoogleSpreadsheet.service';
import { AttendeesService } from 'src/services/Attendees.service';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameTab } from '../../assets/models/game-lib';
import { take } from 'rxjs';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'prtzl-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  //Icons used here
  public menu = faSquareCaretRight;

  public gameLibTabs!: GameTab[];
  public activeTab!: GameTab;
  public google = new GoogleSpreadsheetService();

  @ViewChild('utilities') public utilities!: MatSidenav;

  constructor(
    private http: HttpClient,
    public library: FaIconLibrary,
  ) {
    this.http.get('getLibTabs').pipe(take(1)).subscribe((data: any) => {
      this.gameLibTabs = data as GameTab[];
    });

    library.addIconPacks(fas);
  }

  ngOnInit() {

  }

  public toggleUtil() {
    this.utilities.toggle();
    this.menu = this.menu === faSquareCaretRight ? faSquareCaretLeft : faSquareCaretRight;
  }

}
