import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemFinanceiroComponent } from './listagem-financeiro.component';

describe('ListagemFinanceiroComponent', () => {
  let component: ListagemFinanceiroComponent;
  let fixture: ComponentFixture<ListagemFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
