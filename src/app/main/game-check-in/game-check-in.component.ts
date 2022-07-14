import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject } from 'rxjs';
import { Attendee } from 'src/assets/models/attendee';
import { GameLibraryDto } from 'src/assets/models/game-lib';
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

  public SUBMIT_DISABLED: boolean = true;
  public PTW_SELECTED: boolean = false;

  public gameCheckInForm = new FormGroup({
    gameBarcode: new FormControl({ value: '', disabled: false }),
  })

  public gameCheckInInfo = new FormGroup({
    gameBarcode: new FormControl({ value: '', disabled: true }),
    player: new FormControl({ value: '', disabled: true }),
    checkOutTime: new FormControl({ value: '', disabled: true })
  })


  constructor(private _libService: GameLibraryService) { }

  ngOnInit() { }

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

    if (this.filterGameList.length === 1) {
      this.selectedGame = this.filterGameList[0];

    } else {
      this.filterGameList = [];
    }

    this.validateSubmit();
  }

  public submitGameXIn() {

  }

  public validateSubmit() {

  }

}
