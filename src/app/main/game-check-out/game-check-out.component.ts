import { FormGroup, FormControl } from '@angular/forms';
import { GameLibraryDto } from './../../../assets/models/game-lib';
import { GameLibraryService } from 'src/services/GameLibrary.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Renderer2, AfterViewInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { map, ReplaySubject, takeUntil, take } from 'rxjs';
import { Attendee } from 'src/assets/models/attendee';
import { AttendeesService } from 'src/services/Attendees.service';

@Component({
  selector: 'app-game-check-out',
  templateUrl: './game-check-out.component.html',
  styleUrls: ['./game-check-out.component.scss']
})
export class GameCheckOutComponent implements OnInit, OnDestroy, AfterViewInit {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private _gameList$: GameLibraryDto[] = [];

  public barcode = faBarcode;
  public barcodeColor: FaIconComponent["styles"] = { color: 'white' }
  public barcodeErr!: string;

  public filterGameList: GameLibraryDto[] = [];
  public filterPlayerList: Attendee[] = [];

  public selectedGame: GameLibraryDto = this._libService.emptyGame;

  public SUBMIT_DISABLED: boolean = true;

  public gameCheckoutForm = new FormGroup({
    gameBarcode: new FormControl({ value: '', disabled: false }),
    playerBarcode: new FormControl({ value: '', disabled: false })
  })

  public gameInfoForm = new FormGroup({
    title: new FormControl({ value: '', disabled: true }),
    ptw: new FormControl({ value: false, disabled: true }),
    for2p: new FormControl({ value: false, disabled: true }),
    forKids: new FormControl({ value: false, disabled: true }),
    playerTotal: new FormControl({ value: '', disabled: true }),
    recAge: new FormControl({ value: '', disabled: true }),
  });

  public playerInfoForm = new FormGroup({
    badge: new FormControl({ value: '', disabled: true }),
    playerName: new FormControl({ value: '', disabled: true })
  });

  constructor(
    private _attendeesService: AttendeesService,
    private _libService: GameLibraryService,
    private _cdr: ChangeDetectorRef,
    private _render: Renderer2,
  ) { }

  ngOnInit() {
    this.getLibrary();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.focusGame();
    }, 1);
  }

  public clearForm() {

    this.gameCheckoutForm.setValue({
      gameBarcode: '',
      playerBarcode: '',
    });

    this.filterGameList = [];
    this.filterPlayerList = [];
    this.selectedGame = this._libService.emptyGame;

    this.gameInfoForm.setValue({
      title: '',
      ptw: false,
      for2p: false,
      forKids: false,
      playerTotal: '',
      recAge: '',
    });

    this.playerInfoForm.setValue({
      badge: '',
      playerName: '',
    })

    this.validateSubmit();
  }

  public filterLibrary() {
    const originalFilter = this._gameList$;
    const formGameBarcode = this.gameCheckoutForm.controls['gameBarcode'].value as string;

    let scratchFilter: GameLibraryDto[] = originalFilter;

    if (formGameBarcode.length > 0) {
      scratchFilter = scratchFilter.filter((game: GameLibraryDto) => game.barcode?.toString().match(formGameBarcode));
    }

    this.filterGameList = scratchFilter.length > 5 ? scratchFilter.slice(0, 4) : scratchFilter;

    if (this.filterGameList.length === 1) {
      this.selectedGame = this.filterGameList[0];
      this.gameInfoForm.setValue({
        title: this.selectedGame.title,
        ptw: this.selectedGame.ptw ? this.selectedGame.ptw as boolean : false,
        for2p: this.selectedGame.goodFor2P === 'Y' ? true : false,
        forKids: this.selectedGame.goodForKids === 'Y' ? true : false,
        playerTotal: this.selectedGame.players,
        recAge: this.selectedGame.recAge,
      })
    } else {
      this.filterGameList = [];
    }

    this.validateSubmit();
  }

  public filterPlayer() {
    const formPlayerBarcode = this.gameCheckoutForm.controls['playerBarcode'].value as string;

    this._attendeesService.getAttendeeByBarcode(formPlayerBarcode).pipe(take(1)).subscribe((player: Attendee[]) => {

      

      if (player.length === 1 && player[0]?.id) {
        this.playerInfoForm.setValue({
          badge: player[0].id,
          playerName: player[0].first_name + " " + player[0].last_name
        });

        this.filterPlayerList = player;
      } else {
        this.filterPlayerList = [];
      }

      this.validateSubmit()
    });
  }

  public focusGame() {
    this._render.selectRootElement('#scanGame').focus();
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

  private setPtWForLibrary(library: GameLibraryDto[], ptw: boolean): GameLibraryDto[] {

    library.forEach((game) => {
      game.ptw = ptw;
      return game;
    });
    return library;
  }

  public submitGameXO() {
    this._libService.postGameXO(this.gameCheckoutForm.value).pipe(take(1)).subscribe((response: any) => {
      if (typeof response === 'boolean' && response) {
        this.clearForm();
      }
    });
  }

  public validateSubmit() {

    if (this.filterGameList.length === 1 && this.filterPlayerList.length === 1) {
      this.SUBMIT_DISABLED = false;
    } else {
      this.SUBMIT_DISABLED = true;
    }

    this._cdr.markForCheck();
  }

}
