import { Component, OnInit } from '@angular/core';
import {PessoaService } from '../shared/pessoaService';
@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.css'],
})
export class DiretivasCustomizadasComponent implements OnInit {
  nome: string ='';
   constructor(private pessoa:  PessoaService){
      this.nome = pessoa.nome;
   }

   ngOnInit() {
     
  //  PessoaService.criouNovoCurso.subscribe(
  //                 curso => console.log(curso)
  //               );
   }
}
