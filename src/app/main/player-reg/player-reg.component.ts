import { AttendeesService } from 'src/services/Attendees.service';
import { Attendee, Badge } from 'src/assets/models/attendee';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { faBarcode, faCheckCircle, faExclamationTriangle, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReplaySubject, take, takeUntil } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-player-reg',
  templateUrl: './player-reg.component.html',
  styleUrls: ['./player-reg.component.scss']
})
export class PlayerRegComponent implements OnInit, OnDestroy, AfterViewInit {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private _player$: Attendee[] = [];

  public readonly menu = faSquareCaretRight;

  public barcode = faBarcode;
  public barcodeColor: FaIconComponent["styles"] = { color: 'white' }
  public barcodeErr!: string;

  public FAMILIY_BOOL: boolean = false;
  public SUBMIT_DISABLED: boolean = true;
  public LOADING: boolean = true;

  public playerRegForm = new FormGroup({
    firstName: new FormControl({ value: '', disabled: false }),
    lastName: new FormControl({ value: '', disabled: false }),
  });

  public formBarcode = new FormGroup({
    barcode: new FormControl({ value: '', disabled: false })
  });

  public filterPlayer: Attendee[] = [];

  constructor(
    private _attendeesService: AttendeesService,
    private cdr: ChangeDetectorRef,
    private _render: Renderer2,
  ) {
    this.getAttendees();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.focusName();
    }, 1);
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  private setBarcodeState(state: string) {
    switch (state) {

      case 'valid':
        this.barcode = faCheckCircle;
        this.barcodeColor = { color: 'limegreen' }
        this.barcodeErr = '';
        break;

      case 'error':
        this.barcode = faExclamationTriangle;
        this.barcodeColor = { color: 'goldenrod' }
        this.barcodeErr = 'This Barcode was already registered to this user'
        break;

      default:
        this.barcode = faBarcode;
        this.barcodeColor = { color: 'white' }
        this.barcodeErr = '';
        break
    }
  }

  public clearForm() {
    this.playerRegForm.setValue({
      firstName: '',
      lastName: ''
    });
    this.formBarcode.setValue({
      barcode: ''
    });
    this.barcodeErr = '';
    this.validSubmit();
    this.filterPlayer = [];
  }

  public filterPlayers() {
    const originalFilter = this._player$;
    let scratchFilter: Attendee[] = originalFilter;

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

  public focusName() {
    console.log(this._render.selectRootElement('#fNameId'));
    this._render.selectRootElement('#fNameId').focus();
  }

  public formComplete(event: MatAutocompleteSelectedEvent) {
    const autoValue = event.option.value;
    this.playerRegForm.setValue({
      firstName: autoValue.first_name,
      lastName: autoValue.last_name,
    });
    this.filterPlayers();
  }

  public getAttendees(): void {
    this._attendeesService.getAll().pipe(takeUntil(this._destroyed$)).subscribe((data) => {
      this._player$ = Object.keys(data).map((key) => {
        return data[key]
      });

      console.log(this._player$);
      this.LOADING = false;
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
    const barcode = this.formBarcode.controls['barcode'].value as string;
    if (barcode?.length === 0) {
      this.setBarcodeState('default')
    } else {

      this._attendeesService
        .getAttendeeByBarcode(barcode)
        .pipe(take(1))
        .subscribe((txn: Attendee[]) => {

          const fName = this.playerRegForm.controls['firstName'].value as string
          const lName = this.playerRegForm.controls['lastName'].value as string

          console.log(txn);

          switch (txn.length) {
            case 1:
              if (fName?.length > 0 || lName?.length > 0) {

                if (
                  txn[0].first_name.includes(fName) &&
                  txn[0].last_name.includes(lName)
                ) {

                  this.playerRegForm.setValue({
                    firstName: txn[0].first_name,
                    lastName: txn[0].last_name,
                  });

                  this.setBarcodeState('error');
                }
              }

              if (fName?.length === 0 && lName?.length === 0) {
                this.playerRegForm.setValue({
                  firstName: txn[0].first_name,
                  lastName: txn[0].last_name,
                });

                this.setBarcodeState('error');
              }
              break;

            case 0:
              break;
          }
          // if (txn.length === 1) {
          //   const player = txn[0];

          //   if (fName?.length === 0 && lName?.length === 0) {
          //     this.playerRegForm.setValue({
          //       firstName: player.first_name,
          //       lastName: player.last_name,
          //     });

          //     this.setBarcodeState('valid');
          //   }
        });
    }
    // this._attendeesService
    //     .getRegTxns(barcode)
    //     .pipe(takeUntil(this._destroyed$))
    //     .subscribe((txns: Badge) => {

    //       const validAttendee = this._player$.filter((player) => (player.barcode.length > 0) && player.barcode[0].attendee_id === barcode);

    //       barcodeTxns.push(txns);

    //       if (validAttendee.length === 0 || isEqual(this.filterPlayer, validAttendee[0])) {
    //         this.barcode = faCheckCircle;
    //         this.barcodeColor = { color: 'limegreen' };
    //       } else {
    //         this.barcode = faExclamationTriangle;
    //         this.barcodeColor = { color: 'gold' };
    //         this.barcodeErr = `Barcode registered to ${validAttendee[0].first_name} ${validAttendee[0].last_name} at ${validAttendee[0].barcode[0] ? validAttendee[0].barcode[0].timestamp.substring(0, validAttendee[0].barcode[0].timestamp.length - 10) : 'MISSING TIMESTAMP'}`

    //         const chosenOne = validAttendee[0];

    //         this.playerRegForm.setValue({
    //           conID: chosenOne.id,
    //           firstName: chosenOne.first_name,
    //           lastName: chosenOne.last_name,
    //           formBarcode: chosenOne.barcode[0].barcode ? chosenOne.barcode[0].barcode : '',
    //         });
    //       }
    //     });
    // }
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

