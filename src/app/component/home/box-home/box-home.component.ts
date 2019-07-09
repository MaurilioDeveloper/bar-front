import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'box-home',
  templateUrl: './box-home.component.html',
  styleUrls: ['./box-home.component.scss']
})
export class BoxHomeComponent implements OnInit {

  @Input() item: any;
  public urlImagem: string = "../../../assets/images/";
  public array: any = [1];

  constructor() { }

  ngOnInit() {
    if (this.item == 'Treinamento') {
      this.array = [1, 2];
    }
    this.urlImagem += this.retiraAcentos(this.item.toLowerCase()) +  ".png";
  }

  private retiraAcentos(str: string) {
    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let novastr="";
      for(let i=0; i<str.length; i++) {
          let troca=false;
          for (let a=0; a<com_acento.length; a++) {
              if (str.substr(i,1)==com_acento.substr(a,1)) {
                  novastr+=sem_acento.substr(a,1);
                  troca=true;
                  break;
              }
          }
          if (troca==false) {
              novastr+=str.substr(i,1);
          }
      }
      return novastr;
  } 
}
