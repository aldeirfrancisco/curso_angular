import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, take, catchError, of, Subject, switchMap, EMPTY } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { AlertModealComponent } from 'src/app/shared/alert-modeal/alert-modeal.component';
import { AlertModelServiceService } from 'src/app/shared/alert-model-service.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  @ViewChild('deleteModal', { static: true }) deleteModal: any;
  error$ =  new Subject<boolean>();
  bsModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;
  cursoSelecionado?: Curso;

  constructor( private cursoService: CursosService,
               private alert: AlertModelServiceService,
               private router: Router,
               private modalService: BsModalService,
               private route: ActivatedRoute){}

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

  onEdit(id: number){
    this.router.navigate(['editar',id], { relativeTo: this.route})
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

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alert.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    result$?.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.cursoService.remove(curso.id) : EMPTY)
    )
    .subscribe(
      (success: any) => {
        this.onRefresh();
        console.log(success);

      },
      (error: any) => {
        console.log(error);
        this.alert.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }

  handleError(){
    this.alert.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }
}
