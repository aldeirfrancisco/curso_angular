import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-output-properties',
  templateUrl: './input-output-properties.component.html',
  styleUrls: ['./input-output-properties.component.css'],
  inputs: ['aqui'] 
})
export class InputOutputPropertiesComponent  implements OnInit{
  //pode ser desse dessa 3 formas
  @Input('vamos') nomeCurso: string = 'a'; 
  @Input() nome: string = 'a';
  aqui: string = '';
  valor: number = 10

  onMudou(evento: any){
    console.log(evento);
  }

  constructor(){}
  
    ngOnInit(): void {     
    }
}
