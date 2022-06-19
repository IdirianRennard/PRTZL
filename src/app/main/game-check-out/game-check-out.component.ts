import { GameLibraryDto } from './../../../assets/models/game-lib';
import { GameLibraryService } from 'src/services/GameLibrary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Attendee } from 'src/assets/models/attendee';
import { AttendeesService } from 'src/services/Attendees.service';

@Component({
  selector: 'app-game-check-out',
  templateUrl: './game-check-out.component.html',
  styleUrls: ['./game-check-out.component.scss']
})
export class GameCheckOutComponent implements OnInit, OnDestroy {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private _player$: Attendee[] = [];
  private _gameList$: GameLibraryDto[] = [];

  public barcode = faBarcode;
  public barcodeColor: FaIconComponent["styles"] = { color: 'white' }
  public barcodeErr!: string;


  constructor(
    private _attendeesService: AttendeesService,
    private _libService: GameLibraryService
  ) { }

  ngOnInit() {
    this.getLibrary();
    this.getAttendees();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  public getAttendees(): void {
    this._attendeesService.getAll().pipe(takeUntil(this._destroyed$)).subscribe((data: Attendee[]) => {
      const playerArray: Attendee[] = [];
      const playerEntries = Object.entries(data);

      for (let i = 0; i < playerEntries.length; i++) {
        playerArray[playerEntries[i][0] as unknown as number] = playerEntries[i][1];
      }

      this._player$ = playerArray;
    });
  }

  public getLibrary(): any {
    this._libService.library$.pipe(takeUntil(this._destroyed$)).subscribe((library: any) => {
      console.log("NATE >>>> \t library : ", library);
      this._gameList$ = library;
    });
  }

}
