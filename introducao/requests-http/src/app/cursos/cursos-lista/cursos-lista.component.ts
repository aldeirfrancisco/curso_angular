import { Component, OnInit } from '@angular/core';
import { Observable, take, catchError, of, Subject } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[] = [];
  //$ variavel com isso é um observable
  cursos$: Observable<Curso[]> = new Observable();
  error$ =  new Subject<boolean>();
  constructor(private cursoService: CursosService){}

  //observable são lazy (preguiçoso)
  //observable são uma strime de dados
  //tem que se escrever e fica escultado as mudanças
  //subscribe ativa a inscrição
  ngOnInit(){


    //this.cursoService.list().subscribe( cursos => this.cursos = cursos)

    this.onRefresh();

    // const aqui  = this.cursoService.list()
    //                    .subscribe( dados => {
    //                      console.log(dados);
    //                    }, error => {
    //                        console.error(error)
    //                    }, () => {
    //                     console.log('Observable completo')
    //                    });
  }

  onRefresh() {
    this.cursos$ = this.cursoService.list()
    .pipe(
        catchError( error =>  {
          console.error("error ",error);
          this.error$.next(true);
          return of();
        }),
        take(1)
     );

  }
}
