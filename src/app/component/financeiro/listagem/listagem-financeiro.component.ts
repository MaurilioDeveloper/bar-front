import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Parceiro } from 'src/app/model/financeiro';

const PARCEIROS: Parceiro[] = [
  {nome: 'Carlos dos Santos Oliveira', statusNFE: 'Aguardando upload da NF', valor: 1000.79},
  {nome: 'Aline dos Anjos', statusNFE: 'Aguardando upload da NF', valor: 100.70},
  {nome: 'Willian Santana Jr.', statusNFE: 'Aguardando upload da NF', valor: 1007.11},
  {nome: 'Maria de Oliveira', statusNFE: 'Aguardando upload da NF', valor: 1007.22}
];

@Component({
  selector: 'app-listagem-financeiro',
  templateUrl: './listagem-financeiro.component.html',
  styleUrls: ['./listagem-financeiro.component.scss']
})
export class ListagemFinanceiroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'nome', 'statusNFE', 'valor'];
  dataSource = new MatTableDataSource<Parceiro>(PARCEIROS);
  selection = new SelectionModel<Parceiro>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Parceiro): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nome + 1}`;
  }

  /** Apply filter on datatable */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
