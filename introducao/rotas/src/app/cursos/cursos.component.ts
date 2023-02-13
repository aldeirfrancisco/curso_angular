import { Component } from '@angular/core';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  curso: any;

  constructor(private cursos : CursosService ){
     this.curso = cursos.getCursos();
  }
}
