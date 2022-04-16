/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GemboxComponent } from './gembox.component';

describe('GemboxComponent', () => {
  let component: GemboxComponent;
  let fixture: ComponentFixture<GemboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GemboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GemboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
