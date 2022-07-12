import { RegSubmit } from './../../../assets/models/reg';
import { AttendeesService } from 'src/services/Attendees.service';
import { Attendee, Badge } from 'src/assets/models/attendee';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faBarcode, faCheckCircle, faEdit, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { isEqual } from 'lodash';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReplaySubject, take, takeUntil } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

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
  public barcodeColor: FaIconComponent["styles"] = { color: 'white' }
  public barcodeErr!: string;

  public FAMILIY_BOOL: boolean = false;
  public SUBMIT_DISABLED: boolean = true;
  public LOADING: boolean = true;

  public playerRegForm = new FormGroup({
    conID: new FormControl({ value: '', disabled: false }),
    formBarcode: new FormControl({ value: '', disabled: false }),
    firstName: new FormControl({ value: '', disabled: false }),
    lastName: new FormControl({ value: '', disabled: false }),
  });

  public filterPlayer: Attendee[] = [];

  constructor(private _attendeesService: AttendeesService, private cdr: ChangeDetectorRef) {
    this.getAttendees();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  public clearForm() {
    this.playerRegForm.setValue({
      conID: '',
      formBarcode: '',
      firstName: '',
      lastName: ''
    });
    this.validSubmit();
    this.filterPlayer = [];
  }

  public filterPlayers() {
    const originalFilter = this._player$;
    let scratchFilter: Attendee[] = originalFilter;

    if ((this.playerRegForm.controls['conID'].value as string).length > 0) {
      scratchFilter = scratchFilter.filter((player: Attendee) => player.id.toString().match(this.playerRegForm.controls['conID'].value as string));
    }

    if ((this.playerRegForm.controls['firstName'].value as string).length > 0) {
      scratchFilter = scratchFilter.filter((player: Attendee) => player.first_name.toString().match(this.playerRegForm.controls['firstName'].value as string));
    }

    if ((this.playerRegForm.controls['lastName'].value as string).length > 0) {
      scratchFilter = scratchFilter.filter((player: Attendee) => player.last_name.toString().match(this.playerRegForm.controls['lastName'].value as string));
    }

    this.filterPlayer = scratchFilter.length > 5 ? scratchFilter.slice(0, 4) : scratchFilter;

    // this.loadFamily();
    this.validSubmit();
  }

  public formComplete(event: MatAutocompleteSelectedEvent) {
    const autoValue = event.option.value;
    this.playerRegForm.setValue({
      conID: autoValue.id,
      firstName: autoValue.first_name,
      lastName: autoValue.last_name,
      formBarcode: autoValue.barcode.length > 0 ? autoValue.barcode[0].id : null,
    });

    this.filterPlayers();
  }

  public getAttendees(): void {
    this._attendeesService.getAll().pipe(takeUntil(this._destroyed$)).subscribe((data) => {
      this._player$ = Object.keys(data).map((key) => {
        return data[key]
      });

      this.LOADING = false;
      this.cdr.markForCheck();
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
    const formData = this.playerRegForm.value;

    this._attendeesService.postNewReg(formData).pipe(take(1)).subscribe((response: any) => {
      if (typeof response === 'boolean' && response) {
        this.clearForm();
      }
    });
  }

  public validBarcode() {
    const barcode = this.playerRegForm.controls['formBarcode'].value as string;
    if (barcode?.length === 0) {
      this.barcode = faBarcode;
      this.barcodeColor = { color: 'white' };
      this.barcodeErr = '';
    } else {

      let barcodeTxns: Badge[] = []
      this._attendeesService
        .getRegTxns(barcode)
        .pipe(takeUntil(this._destroyed$))
        .subscribe((txns: Badge) => {

          const validAttendee = this._player$.filter((player) => (player.barcode.length > 0) && player.barcode[0].id === barcode);

          barcodeTxns.push(txns);

          if (validAttendee.length === 0 || isEqual(this.filterPlayer, validAttendee[0])) {
            this.barcode = faCheckCircle;
            this.barcodeColor = { color: 'limegreen' };
          } else {
            this.barcode = faExclamationTriangle;
            this.barcodeColor = { color: 'gold' };
            this.barcodeErr = `Barcode registered to ${validAttendee[0].first_name} ${validAttendee[0].last_name} at ${validAttendee[0].barcode[0] ? validAttendee[0].barcode[0].timestamp.substring(0, validAttendee[0].barcode[0].timestamp.length - 10) : 'MISSING TIMESTAMP'}`

            const chosenOne = validAttendee[0];

            this.playerRegForm.setValue({
              conID: chosenOne.id,
              firstName: chosenOne.first_name,
              lastName: chosenOne.last_name,
              formBarcode: chosenOne.barcode[0].id,
            });
          }
        });
    }
  }


  public validSubmit() {
    this.validBarcode();

    if (this.filterPlayer.length === 1 && (this.barcode === faCheckCircle)) {
      this.SUBMIT_DISABLED = false;
    } else {
      this.SUBMIT_DISABLED = true;
    }
  }
}

