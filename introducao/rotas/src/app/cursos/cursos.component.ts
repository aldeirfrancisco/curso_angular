import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  curso: any;

  constructor(private cursos : CursosService, private router: Router){
     this.curso = cursos.getCursos();
  }

  selecionado(id: any): void {
     this.router.navigate(['curso/'+id]); 
  }
}

