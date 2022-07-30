import { AttendeesService } from 'src/services/Attendees.service';
import { Attendee, Badge } from 'src/assets/models/attendee';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { faBan, faBarcode, faBriefcaseClock, faCheckCircle, faExclamationTriangle, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReplaySubject, take, takeUntil } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { ClearFormComponent } from 'src/app/shared/clear-form/clear-form.component';

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
    public clearDialog: MatDialog,
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

      case 'barcodeUsed':
        this.barcode = faBan;
        this.barcodeColor = { color: 'red' };
        this.barcodeErr = 'Barcode has been previously registered';
        break;

      case 'error':
        this.barcode = faExclamationTriangle;
        this.barcodeColor = { color: 'goldenrod' };
        this.barcodeErr = 'This Barcode was already registered to this user';
        break;

      case 'missingName':
        this.barcode = faExclamationTriangle;
        this.barcodeColor = { color: 'goldenrod' };
        this.barcodeErr = 'You must enter a name to register this Barcode';
        break;

      case 'valid':
        this.barcode = faCheckCircle;
        this.barcodeColor = { color: 'limegreen' };
        this.barcodeErr = '';
        break;

      default:
        this.barcode = faBarcode;
        this.barcodeColor = { color: 'white' };
        this.barcodeErr = '';
        break;
    }
  }

  public clearForm() {

    // this.clearDialog.open(ClearFormComponent);

    this.playerRegForm.setValue({
      firstName: '',
      lastName: ''
    });
    this.formBarcode.setValue({
      barcode: ''
    });

    this.filterPlayer = [];
    this.validBarcode();
    this.focusName();
  }

  public filterPlayers() {
    const originalFilter = this._player$;
    const fName = this.playerRegForm.controls['firstName'].value as string;
    const lName = this.playerRegForm.controls['lastName'].value as string;
    let scratchFilter: Attendee[] = originalFilter;

    if (fName?.length > 0) {
      scratchFilter = scratchFilter.filter((player: Attendee) => player.first_name.toString().match(this.playerRegForm.controls['firstName'].value as string));
    }

    if (lName?.length > 0) {
      scratchFilter = scratchFilter.filter((player: Attendee) => player.last_name.toString().match(this.playerRegForm.controls['lastName'].value as string));
    }

    this.filterPlayer = scratchFilter.length > 5 ? scratchFilter.slice(0, 4) : scratchFilter;

    if (
      this.filterPlayer.length === 1 &&
      fName?.length > 0 &&
      fName === this.filterPlayer[0].first_name &&
      lName?.length > 0 &&
      lName === this.filterPlayer[0].last_name
    ) {
      this.focusBarcode();
    }

    this.validSubmit();
  }

  public focusBarcode() {
    this._render.selectRootElement('#scanPlayer').focus();
  }

  public focusName() {
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
    const formData = {
      ...this.playerRegForm.value,
      conID: this.filterPlayer[0].id,
      formBarcode: this.formBarcode.controls['barcode'].value as string
    };

    this._attendeesService.postNewReg(formData).pipe(take(1)).subscribe((response: any) => {
      if (typeof response === 'boolean' && response) {
        this.clearForm();
        this.focusName();
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
        .pipe(takeUntil(this._destroyed$))
        .subscribe((txn: Attendee[]) => {

          console.log(txn);
          const fName = this.playerRegForm.controls['firstName'].value as string
          const lName = this.playerRegForm.controls['lastName'].value as string

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
                } else {

                  this.setBarcodeState('barcodeUsed');
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
              if (fName?.length > 0 && lName?.length > 0) {

                this.setBarcodeState('valid');
              } else {

                this.setBarcodeState('missingName');
              }
              break;
          }

          this.validSubmit();
        });
    };
  }


  public validSubmit() {
    if (this.filterPlayer.length === 1 && (this.barcode === faCheckCircle)) {
      this.SUBMIT_DISABLED = false;
    } else {
      this.SUBMIT_DISABLED = true;
    }
  }
}

