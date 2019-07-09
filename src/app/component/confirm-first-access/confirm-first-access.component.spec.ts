import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFirstAccessComponent } from './confirm-first-access.component';

describe('ConfirmFirstAccessComponent', () => {
  let component: ConfirmFirstAccessComponent;
  let fixture: ComponentFixture<ConfirmFirstAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmFirstAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFirstAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
