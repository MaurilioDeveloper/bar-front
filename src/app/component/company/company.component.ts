import { ListCompanyComponent } from './list-company/list-company.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @ViewChildren(ListCompanyComponent) listagemCompanyComponent: QueryList<ListCompanyComponent>; 

  constructor() { }

  ngOnInit() {
  }

  public applyFilter(filterValue: string) {
    this.listagemCompanyComponent.forEach(l => l.applyFilter(filterValue));
  }

}
