import { Component, OnInit } from '@angular/core';
import { faBell, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prtzl-gembox',
  templateUrl: './gembox.component.html',
  styleUrls: ['./gembox.component.scss']
})
export class GemboxComponent implements OnInit {

  public readonly bell = faBell;
  public readonly clock = faClock;

  constructor() { }

  ngOnInit() {
  }

}
