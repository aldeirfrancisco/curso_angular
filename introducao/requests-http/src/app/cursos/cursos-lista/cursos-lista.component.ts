import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos: Curso[] = [];
  constructor(private cursoService: CursosService){}

  //observable são lazy (preguiçoso)
  //observable são uma strime de dados
  //tem que se escrever e fica escultado as mudanças
  //subscribe ativa a inscrição
  ngOnInit(){

    this.cursoService.list().subscribe( cursos => this.cursos = cursos)
  }
}
