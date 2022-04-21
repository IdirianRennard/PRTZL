import { AttendeesService } from 'src/services/Attendees.service';
import { Attendee } from 'src/assets/models/attendee';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBarcode, faCheckCircle, faEdit, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { isEqual } from 'lodash';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReplaySubject, takeUntil } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-player-reg',
  templateUrl: './player-reg.component.html',
  styleUrls: ['./player-reg.component.scss']
})
export class PlayerRegComponent implements OnInit, OnDestroy {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private _player$: Attendee[] = [];

  public readonly edit = faEdit;

  public barcode = faBarcode;
  public barcodeColor: FaIconComponent["styles"] = { stroke: 'black', color: 'white' };
  public barcodeErr!: string;

  public FAMILIY_BOOL: boolean = false;
  public SUBMIT_DISABLED: boolean = true;

  public conID = new FormControl('');
  public formBarcode = new FormControl('');
  public firstName = new FormControl('');
  public lastName = new FormControl('');

  public filterPlayer: Attendee[] = [];

  constructor(private _attendeesService: AttendeesService) { }

  ngOnInit(): void {
    this.getAttendees();
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
    let activeFilter: Attendee;

    if (this.conID.value.length > 0) {
      scratchFilter = scratchFilter.filter(player => player.attendee_id.toString().includes(this.conID.value));
    }

    if (this.firstName.value.length > 0) {
      scratchFilter = scratchFilter.filter(player => player.first_name.toLowerCase().includes(this.firstName.value.toLowerCase()));
    }

    if (this.lastName.value.length > 0) {
      scratchFilter = scratchFilter.filter(player => player.last_name.toLowerCase().includes(this.lastName.value.toLowerCase()));
    }

    this.filterPlayer = scratchFilter.slice(0, 4);
    this.loadFamily();
    this.validSubmit();

    if (this.filterPlayer.length === 1) {
      activeFilter = this.filterPlayer[0];

    }
  }

  public formComplete(event: MatAutocompleteSelectedEvent) {
    const autoValue = event.option.value;
    this.conID.setValue(autoValue.attendee_id, { emitEvent: true });
    this.firstName.setValue(autoValue.first_name, { emitEvent: true });
    this.lastName.setValue(autoValue.last_name, { emitEvent: true });

    if (autoValue.badge) {
      this.formBarcode.setValue(autoValue.badge.id, { emitEvent: true });
    }
    this.filterPlayers();

  }

  public getAttendees(): void {
    this._attendeesService.getAll().pipe(takeUntil(this._destroyed$)).subscribe((data: Attendee[]) => {
      this._player$ = data;
    });
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

  public validBarcode() {
    if (this.formBarcode.value.length === 0) {
      this.barcode = faBarcode;
      this.barcodeErr = '';
    }

    // Is the barcode assigned to someone else?
    const validAttendee = this._player$.filter((player) => player.badge != null && player.badge.id.includes(this.formBarcode.value));

    if (validAttendee.length === 0 || isEqual(this.filterPlayer, validAttendee[0])) {
      this.barcode = faCheckCircle;
      this.barcodeColor = { stroke: 'white', color: 'limegreen' }
    } else {
      this.barcode = faExclamationTriangle;
      this.barcodeColor = { stroke: 'white', color: 'limegreen' }
      this.barcodeErr = `Barcode registered to ${validAttendee[0].first_name} ${validAttendee[0].first_name} at ${validAttendee[0].badge ? validAttendee[0].badge.timestamp : 'MISSING TIMESTAMP'}`
    }
  }


  public validSubmit() {
    if (this.filterPlayer.length === 1 && (this.barcode = faCheckCircle)) {
      this.SUBMIT_DISABLED = false;
    } else {
      this.SUBMIT_DISABLED = true;
    }
  }
}

