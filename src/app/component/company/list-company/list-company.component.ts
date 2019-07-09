import { MatTableDataSource } from '@angular/material';
import { Company } from './../../../model/company';
import { Component, OnInit } from '@angular/core';

const COMPANIES: Company[] = [
  {cnpj: '032.239.932-25', description: 'Barigui Financeira', city: 'Curitiba',
  state: 'Parana', cep:'982338-120', situation: true},
  {cnpj: '032.239.932-25', description: 'BRQ DIGITAL SOLUTIONS', city: 'Curitiba',
  state: 'Parana', cep:'982338-120', situation: true},
  {cnpj: '032.239.932-25', description: 'BRQ DIGITAL SOLUTIONS', city: 'Curitiba',
  state: 'Parana', cep:'982338-120', situation: true},
];

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['description', 'cnpj', 'city', 'state'];
  dataSource = new MatTableDataSource<Company>(COMPANIES);

  /** Apply filter on datatable */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
