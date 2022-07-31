import { Component, OnInit } from '@angular/core';
import { PtwService } from 'src/services/ptw.service';

@Component({
  selector: 'app-ptw-drawing',
  templateUrl: './ptw-drawing.component.html',
  styleUrls: ['./ptw-drawing.component.scss']
})
export class PtwDrawingComponent implements OnInit {

  constructor(private _ptwService: PtwService) { }

  ngOnInit() {

  }

}
