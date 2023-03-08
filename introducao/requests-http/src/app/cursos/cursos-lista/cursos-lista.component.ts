import { Component, OnInit } from '@angular/core';
import { Observable, take, catchError, of, Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { AlertModealComponent } from 'src/app/shared/alert-modeal/alert-modeal.component';

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
  bsModalRef?: BsModalRef;

  constructor( private cursoService: CursosService,
               private modalService: BsModalService){}

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
          //this.error$.next(true);
          this.handleError();
          return of();
        }),
        take(1)
     );
  }

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModealComponent);
    this.bsModalRef.content.type= 'danger';
    this.bsModalRef.content.message= 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
