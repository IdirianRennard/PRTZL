import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prtzl-gembox',
  templateUrl: './gembox.component.html',
  styleUrls: ['./gembox.component.scss']
})
export class GemboxComponent implements OnInit {

  public readonly bell = faBell;

  constructor() { }

  ngOnInit() {
  }

}
