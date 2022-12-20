import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-properties.component.html',
  styleUrls: ['./output-properties.component.css']
})
export class OutputPropertiesComponent {

 @Input() valor = 0;

 @Output() mudouValor = new EventEmitter();

  incremento() {
    this.valor++;
 this.mudouValor.emit({valor : this.valor})
 
}
decremento(){
  this.valor--;
  this.mudouValor.emit({valor : this.valor})
  }
}
