import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModelServiceService } from '../../shared/alert-model-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

enum MSN {
  CADASTRO_SUCCESS = 'Curso criado com sucesso!',
  EDITAR_SUCESS = 'Curso atualizado com sucesso!',
  CADASTRO_ERROR = 'Erro ao criar curso, tente novamente!',
  EDITAR_ERROR = 'Erro ao atualizar curso, tente novamente!'
}
@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {

  form: any;
  submitted = false;

  constructor( private fb: FormBuilder,
               private service: CursosService,
               private modal: AlertModelServiceService,
               private location: Location,
               private route: ActivatedRoute){}

  ngOnInit(): void {
  //switchMap cancela as requisições anteriores e apenas devolve o valor do último pedio de requisição
  //create, update, delete => usa o =>  concatMap => a ordem da requisição importa.
  //mergeMap => a ordem não importa.
  //exhaustMap => comum usar em caso de login, obtem a responsta para depois fazer uma nova requisição.
     this.route.params.pipe(
        map(params => params['id']),
        switchMap((id: number) => this.service.loadByID(id))
     ).subscribe((curso: any) => this.updateFrom(curso));

     this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)] ]
     })
  }

  updateFrom(curso: any){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit(){
    this.submitted = true;

    let msgSuccess = MSN.CADASTRO_SUCCESS;
    let msgError = MSN.CADASTRO_ERROR;
    if (this.form.value.id) {
      msgSuccess = MSN.EDITAR_SUCESS;
      msgError = MSN.EDITAR_ERROR;
    }

    if(this.form.valid){
     this.service.create(this.form.value).subscribe(
     ( success ) => {
       this.modal.showAlertSuccess(msgSuccess)
       this.location.back();
      },
      ( error ) => this.modal.showAlertDanger(msgError),
       () => console.log("ok"));
    }






  }

  onCancel(){
    this.submitted = false;
    this.form.reset()
  }
}
