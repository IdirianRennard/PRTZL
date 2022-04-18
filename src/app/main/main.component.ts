import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameTab } from '../../assets/models/game-lib';
import { take } from 'rxjs';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'prtzl-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  //Icons used here
  public readonly bars = faBars;

  public gameLibTabs!: GameTab[];
  public activeTab!: GameTab;


  constructor(private http: HttpClient, library: FaIconLibrary) {
    this.http.get('api/game-lib-tabs.json').pipe(take(1)).subscribe((data: any) => {
      this.gameLibTabs = data.tabs as GameTab[];
    });

    library.addIconPacks(fas);
  }

  ngOnInit() {

  }

}
