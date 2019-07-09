import { ListagemFinanceiroComponent } from './listagem/listagem-financeiro.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  @ViewChildren(ListagemFinanceiroComponent) listagemFinanceiroComponent: QueryList<ListagemFinanceiroComponent>; 

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.listagemFinanceiroComponent.forEach(l => l.applyFilter(filterValue));
  }
}
