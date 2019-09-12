import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskMapComponent } from './desk-map.component';

describe('DeskMapComponent', () => {
  let component: DeskMapComponent;
  let fixture: ComponentFixture<DeskMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
