import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos/cursos.service';


@Component({
  selector: 'app-detalhe-curso',
  templateUrl: './detalhe-curso.component.html',
  styleUrls: ['./detalhe-curso.component.css']
})
export class DetalheCursoComponent implements OnInit {

  id: number = 1;
  curso: any = {};
  Cursos: any[] = [];
  inscricao: any;
  constructor(private route: ActivatedRoute, private cursos : CursosService){
    console.log(this.route);
    
  }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
      this.id = params['id']
    })

    this.getCurso(); 

  }

  getCurso(){

    this.Cursos = this.cursos.getCursos()
    for (let i = 0; i < this.Cursos.length; i++) {
      const element = this.Cursos[i];
        if(element.id == this.id){
          this.curso = element
        }  
    } 
  }

  ngOnDestroy(){


  }
}
