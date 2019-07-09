import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxHomeComponent } from './box-home.component';

describe('BoxHomeComponent', () => {
  let component: BoxHomeComponent;
  let fixture: ComponentFixture<BoxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
