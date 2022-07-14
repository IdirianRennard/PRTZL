import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject, take, takeUntil } from 'rxjs';
import { Attendee } from 'src/assets/models/attendee';
import { GameLibraryDto, LibCheckoutTxn } from 'src/assets/models/game-lib';
import { AttendeesService } from 'src/services/Attendees.service';
import { GameLibraryService } from 'src/services/GameLibrary.service';

@Component({
  selector: 'app-game-check-in',
  templateUrl: './game-check-in.component.html',
  styleUrls: ['./game-check-in.component.scss']
})
export class GameCheckInComponent implements OnInit {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private _player$: Attendee[] = [];
  private _gameList$: GameLibraryDto[] = [];

  public barcode = faBarcode;
  public barcodeColor: FaIconComponent["styles"] = { color: 'white' }
  public barcodeErr!: string;

  public filterGameList: GameLibraryDto[] = [];
  public filterPlayerList: Attendee[] = [];

  public selectedGame: GameLibraryDto = this._libService.emptyGame;
  public playerCheckedOut!: Attendee;

  public SUBMIT_DISABLED: boolean = true;
  public PTW_SELECTED: boolean = false;

  public gameCheckInForm = new FormGroup({
    gameBarcode: new FormControl({ value: '', disabled: false }),
  })

  public gameCheckInInfo = new FormGroup({
    gameBarcode: new FormControl({ value: '', disabled: true }),
    player: new FormControl({ value: '', disabled: true }),
    timestamp: new FormControl({ value: '', disabled: true })
  })


  constructor(private _attendeesService: AttendeesService, private _cdr: ChangeDetectorRef, private _libService: GameLibraryService) {
    this.getLibrary();
  }

  ngOnInit() {

  }

  public clearForm() {
    this.gameCheckInForm.setValue({ gameBarcode: '' });
  }

  public filterLibrary() {
    const originalFilter = this._gameList$;
    const formGameBarcode = this.gameCheckInForm.controls['gameBarcode'].value as string;

    let scratchFilter: GameLibraryDto[] = originalFilter;

    if (formGameBarcode.length > 0) {
      scratchFilter = scratchFilter.filter((game: GameLibraryDto) => game.barcode?.toString().match(formGameBarcode));
    }

    this.filterGameList = scratchFilter.length > 5 ? scratchFilter.slice(0, 4) : scratchFilter;

    console.log(this.filterGameList);

    if (this.filterGameList.length === 1) {
      this.selectedGame = this.filterGameList[0];
      this.getXOInfo();

    } else {
      this.filterGameList = [];
    }

    this.validateSubmit();
  }

  public getLibrary() {
    this._libService.ptwLibrary$.pipe(take(1)).subscribe((ptwLibrary: GameLibraryDto[]) => {
      this._gameList$ = this.setPtWForLibrary(ptwLibrary, true);

      this._libService.library$.pipe(take(1)).subscribe((gameLibrary: GameLibraryDto[]) => {
        gameLibrary.forEach((key, val) => {
          const ptwFilter = this._gameList$.filter((game) => game.title === key.title)

          if (ptwFilter.length > 0) {
            key.ptw = true
          } else {
            key.ptw = false
          }

          this._gameList$ = [
            ...this._gameList$,
            key
          ];
        })
      });
    });
  }

  public getXOInfo() {
    const gameBarcode = this.selectedGame.barcode as string;

    this._libService.getGameXOTxn(gameBarcode).pipe(take(1)).subscribe((xOTxn: LibCheckoutTxn[]) => {
      console.log(xOTxn)
    });


    // this._attendeesService.getRegTxns(gameInfo.attendee).pipe(take(1)).subscribe((txns: any[]) => {
    //   if (txns.length === 1) {
    //     playerId = txns[0].attendee_id

    //     this.filterPlayerList = this._attendeesService.getAttendeeById(playerId);

    //     this.playerInfoForm.setValue({
    //       badge: this.filterPlayerList[0].id,
    //       playerName: this.filterPlayerList[0].first_name + " " + this.filterPlayerList[0].last_name
    //     });
    //   } else {
    //     this.filterPlayerList = [];
    //   }
    //   this.validateSubmit();
    // });
  }

  private setPtWForLibrary(library: GameLibraryDto[], ptw: boolean): GameLibraryDto[] {

    library.forEach((game) => {
      game.ptw = ptw;
      return game;
    });

    return library;
  }

  public submitGameXIn() {

  }

  public validateSubmit() {

  }

}
