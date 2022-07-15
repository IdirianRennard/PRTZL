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

  private _gameList$: GameLibraryDto[] = [];

  public barcode = faBarcode;
  public barcodeColor: FaIconComponent["styles"] = { color: 'white' }
  public barcodeErr!: string;

  public filterGameList: GameLibraryDto[] = [];
  public filterPlayerList: Attendee[] = [];

  public selectedGame: GameLibraryDto = this._libService.emptyGame;
  public playerCheckedOut!: Attendee;
  public ptwEntries!: any;

  public SUBMIT_DISABLED: boolean = true;
  public PTW_SUBMIT_DISABLED: boolean = true;
  public PTW_SELECTED: boolean = false;

  public gameCheckInForm = new FormGroup({
    gameBarcode: new FormControl({ value: '', disabled: false }),
  })

  public gameCheckInInfo = new FormGroup({
    gameName: new FormControl({ value: '', disabled: true }),
    timestamp: new FormControl({ value: '', disabled: true })
  })

  public ptwEntriesForm = new FormGroup({});

  constructor(
    private _attendeesService: AttendeesService,
    private _cdr: ChangeDetectorRef,
    private _libService: GameLibraryService
  ) {
    this.getLibrary();
  }

  ngOnInit() {

  }

  public clearForm() {
    this.gameCheckInForm.setValue({ gameBarcode: '' });
    this.gameCheckInInfo.setValue({
      gameName: '',
      timestamp: ''
    });

    this.filterGameList = [];
    this.filterPlayerList = [];

    this.PTW_SELECTED = false;
  }

  public clearPtwForm() {

  }

  public filterLibrary() {
    const originalFilter = this._gameList$;
    const formGameBarcode = this.gameCheckInForm.controls['gameBarcode'].value as string;

    let scratchFilter: GameLibraryDto[] = originalFilter;

    if (formGameBarcode.length > 0) {
      scratchFilter = scratchFilter.filter((game: GameLibraryDto) => game.barcode?.toString().match(formGameBarcode));
    }

    this.filterGameList = scratchFilter.length > 5 ? scratchFilter.slice(0, 4) : scratchFilter;

    if (this.filterGameList.length === 1) {
      this.selectedGame = this.filterGameList[0];
      this.getXOInfo();

    } else {
      this.filterGameList = [];
    }

    this.validateSubmit();
  }

  public filterPtwEntry(index: number) {
    const nextControlName = "player" + (index + 1);
    const ptwFormEntriesKeys = Object.entries(this.ptwEntriesForm.value);

    const controlValue = ptwFormEntriesKeys[index + 1][1] as string;

    if (ptwFormEntriesKeys.length < 11 && (ptwFormEntriesKeys.length - 2) === index && controlValue.length > 0) {
      this.ptwEntriesForm.addControl(nextControlName, new FormControl(''))
      this.ptwEntries.push(nextControlName);
    }

    this.validatePtwSubmit();
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

      xOTxn.sort((a: LibCheckoutTxn, b: LibCheckoutTxn) => (a.timestamp > b.timestamp) ? -1 : 1);

      if (xOTxn.length > 0) {

        this.filterPlayerList = this._attendeesService.getAttendeeById(xOTxn[0].attendee_barcode);

        this.gameCheckInInfo.setValue({
          gameName: this.selectedGame.title,
          timestamp: xOTxn[0].timestamp,
        });

      } else {
        this.filterPlayerList = [];

        this.gameCheckInInfo.setValue({
          gameName: '',
          timestamp: '',
        });

      }
      this.validateSubmit();
    });
  }

  private setPtWForLibrary(library: GameLibraryDto[], ptw: boolean): GameLibraryDto[] {

    library.forEach((game) => {
      game.ptw = ptw;
      return game;
    });

    return library;
  }

  public submitGameXIn() {

    this._libService.postGameXIn(this.gameCheckInForm.value).pipe(take(1)).subscribe((response: any) => {
      if (typeof response === 'boolean' && response && !this.selectedGame.ptw) {
        this.clearForm();
      }
    });
  }

  public submitPtwEntries() {
    const gameName = this.gameCheckInInfo.controls['gameName'].value as string;
    const ptwSubmit = {
      ...this.ptwEntriesForm.value,
      gameName
    };

    this._libService.postPtwEntry(ptwSubmit).pipe(take(1)).subscribe((response: any) => {
      if (typeof response === 'boolean') {

        const ptwForm = Object.keys(this.ptwEntriesForm.value);
        this.clearForm();

        ptwForm.forEach((key) => {
          console.log(key);
          this.ptwEntriesForm.removeControl(key)
        });

        this.clearForm();
      }
    })

  }

  public validatePtwSubmit() {
    const ptwForm = Object.entries(this.ptwEntriesForm.value);
    const loopContent = ptwForm[0][1] as string

    if (ptwForm.length > 2 && loopContent.length > 0) {

      this.PTW_SUBMIT_DISABLED = false;

    } else {

      this.PTW_SUBMIT_DISABLED = true;
    }

  }

  public validateSubmit() {
    const gameName = this.gameCheckInInfo.controls['gameName'].value as string;
    const timestamp = this.gameCheckInInfo.controls['timestamp'].value as string;

    if (gameName.length > 0 && timestamp.length > 0) {
      this.SUBMIT_DISABLED = false;
      this.PTW_SELECTED = this.selectedGame.ptw ? true : false;

      if (this.PTW_SELECTED) {
        this.ptwEntriesForm.addControl('loops', new FormControl(''));
        this.ptwEntriesForm.addControl('player0', new FormControl(''));
        this.ptwEntries = [
          "player0"
        ]
      }

    } else {
      this.SUBMIT_DISABLED = true;
      this.PTW_SELECTED = false;
    }

    this._cdr.markForCheck();
  }

}
