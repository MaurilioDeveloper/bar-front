import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-crud',
  templateUrl: './header-crud.component.html',
  styleUrls: ['./header-crud.component.scss']
})
export class HeaderCrudComponent implements OnInit {

  @Input() title: any;
  @Input() dsButton: any;

  constructor() { }

  ngOnInit() {
  }

}
