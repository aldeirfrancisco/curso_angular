import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModelServiceService } from '../../shared/alert-model-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
     this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)] ]
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
       () => console.log("ok")


     )
    }






  }

  onCancel(){
    this.submitted = false;
    this.form.reset()
  }
}
