import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBarcode, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Player } from 'src/assets/models/player';
import { Reg } from 'src/assets/models/reg';
import { ReplaySubject } from 'rxjs';
import { SheetsAPIService } from 'src/services/sheets-api.service';

@Component({
  selector: 'app-player-reg',
  templateUrl: './player-reg.component.html',
  styleUrls: ['./player-reg.component.scss']
})
export class PlayerRegComponent implements OnInit, OnDestroy {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  private _player$: Player[] = [];
  private _reg$: Reg[] = [];

  private _sheetID = "11qTIwHqrunw63Jkmqv98iQPfENKTI8s1WAsMTpy2Wv8";
  private _playerSheet = "sample_gamers";
  private _regSheet = "registered_players";

  private _playerMap = {
    badge: "badge",
    id: "id",
    first_name: "first_name",
    last_name: "last_name"
  }

  private _regMap = {
    ...this._playerMap,
    timestamp: "timestamp"
  }

  public readonly edit = faEdit;
  public readonly barcode = faBarcode;

  public FAMILIY_BOOL: boolean = false;
  public SUBMIT_DISABLED: boolean = true;

  public conID = new FormControl('');
  public formBarcode = new FormControl('');
  public firstName = new FormControl('');
  public lastName = new FormControl('');

  public filterPlayer: Player[] = [];

  constructor(public sapi: SheetsAPIService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  public clearForm() {
    this.conID.setValue('');
    this.formBarcode.setValue('');
    this.firstName.setValue('');
    this.lastName.setValue('');
    this.filterPlayers();
  }

  public filterPlayers() {
    let scratchFilter = this._player$;
    let activeFilter: Player;

    if (this.conID.value.length > 0) {
      scratchFilter = scratchFilter.filter(player => player.id.toString().includes(this.conID.value));
    }

    if (this.firstName.value.length > 0) {
      scratchFilter = scratchFilter.filter(player => player.first_name.toLowerCase().includes(this.firstName.value.toLowerCase()));
    }

    if (this.lastName.value.length > 0) {
      scratchFilter = scratchFilter.filter(player => player.last_name.toLowerCase().includes(this.lastName.value.toLowerCase()));
    }

    this.filterPlayer = scratchFilter.slice(0, 4);
    this.loadFamily();
    this.validSumbit();

    if (this.filterPlayer.length === 1) {
      activeFilter = this.filterPlayer[0];

      const activePlayerList: Reg[] = this._reg$.filter(reg => reg.id.toString().includes(activeFilter.id.toString()))
        .filter(reg => reg.first_name.toLowerCase().includes(activeFilter.first_name.toLowerCase()))
        .filter(reg => reg.last_name.toLowerCase().includes(activeFilter.last_name.toLowerCase()))
    }
  }

  public formComplete(event: MatAutocompleteSelectedEvent) {
    const autoValue = event.option.value;
    this.conID.setValue(autoValue.id, { emitEvent: true });
    this.firstName.setValue(autoValue.first_name, { emitEvent: true });
    this.lastName.setValue(autoValue.last_name, { emitEvent: true });
    this.filterPlayers();
  }

  public loadFamily() {
    if (this.filterPlayer.length === 1) {
      this.FAMILIY_BOOL = true;
    } else {
      this.FAMILIY_BOOL = false;
    }
  }

  public submitMainReg() {

  }

  public validSumbit() {
    if (this.filterPlayer.length === 1) {
      this.SUBMIT_DISABLED = false;
    } else {
      this.SUBMIT_DISABLED = true;
    }
  }
}

