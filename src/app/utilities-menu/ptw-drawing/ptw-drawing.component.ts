import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PtwTxn, PtwFullTxn, GameLibraryDto } from 'src/assets/models/game-lib';
import { PtwService } from 'src/services/ptw.service';
import { AttendeesService } from 'src/services/Attendees.service';
import { Attendee } from 'src/assets/models/attendee';


@Component({
  selector: 'app-ptw-drawing',
  templateUrl: './ptw-drawing.component.html',
  styleUrls: ['./ptw-drawing.component.scss']
})
export class PtwDrawingComponent implements OnInit {

  public attendeeList!: Attendee[];
  public ptwTxnList!: PtwTxn[];
  public fullTxnList!: PtwFullTxn[];
  public ptwGames: GameLibraryDto[] = [];
  public counts = [];

  public LOADING = true;

  constructor(
    private _attendeeService: AttendeesService,
    private _ptwService: PtwService,
  ) {
    this._ptwService.getPtwLibrary().pipe(take(1)).subscribe((library: GameLibraryDto[]) => {
      this.ptwGames = library;
    });

    this._ptwService.getAllPtwTxn().pipe(take(1)).subscribe((ptwTxns: any) => {
      this.ptwTxnList = ptwTxns;
      this.checkAttendees();
    });

  }

  ngOnInit() { }

  public checkAttendees(): void {
    if (this._attendeeService.allAttendees.length === 0) {

      this._attendeeService.getAll().pipe(take(1)).subscribe((data) => {
        this.attendeeList = Object.keys(data).map((key) => {
          return data[key]
        });

        this.formatFullList();
      });
    } else {

      this.attendeeList = this._attendeeService.allAttendees;
      this.formatFullList();
    }

    this.LOADING = true;
  }

  public formatFullList() {
    this.LOADING = false;

    this.fullTxnList = this.ptwTxnList.map((txn: PtwTxn) => {
      console.log(txn);
      const attendee = this.attendeeList.filter((player: Attendee) => player.id === txn.attendee_id)[0];
      return {
        ...txn,
        attendee_id: attendee.id,
        first_name: attendee.first_name,
        last_name: attendee.last_name,
      };

    }).sort((a: PtwFullTxn, b: PtwFullTxn) => { return a.game_name > b.game_name ? (a.hash > b.hash ? 1 : -1) : -1 });

    console.log(this.fullTxnList);


  }


}
