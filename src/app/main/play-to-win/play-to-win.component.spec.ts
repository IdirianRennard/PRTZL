/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlayToWinComponent } from './play-to-win.component';

describe('PlayToWinComponent', () => {
  let component: PlayToWinComponent;
  let fixture: ComponentFixture<PlayToWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayToWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayToWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
