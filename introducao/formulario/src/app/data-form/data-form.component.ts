import { Cidade } from './../shared/models/cidade';
import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { distinctUntilChanged, empty, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Estadosbr } from './../shared/models/estadosbr';
import { DropdownService } from '../shared/services/dropdown.service';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/formValidations ';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  // formulario: FormGroup;
  estados: Estadosbr[] = [];
  cidades: Cidade[] = [];
  cargos: any[] = [];
  tecnologias: any[]= [];
  newsLetterOp: any[] = [];
  frameworks: any[] =['Angular', 'React', 'Vue', 'Sencha'];

  constructor(private  formBuilder: FormBuilder,
              private dropdDownService: DropdownService,
              private cepService: ConsultaCepService,
              private http: HttpClient,
              private verificaEmailService: VerificaEmailService){
      super();
  //    (null) valor inicial, (primeira validators sicrona, segunda validators assícrona  )
 //nome: [null, [Validators.required, Validators.minLength(4)]],
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(4)]],
      //validações sicronas de email,
      //email:[null, [Validators.required, Validators.email]],
      email:[null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
          cep: [null, [Validators.required,FormValidations.cepValidator]],
          numero:[null, Validators.required],
          complemento:[null],
          rua:[null, Validators.required],
          bairro:[null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newLetter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    })
  }



  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1))
  // return [
  //   new FormControl(false),
  //   new FormControl(false),
  //   new FormControl(false),
  //   new FormControl(false)
  // ];
  }


  populaDadosForm(dados: any){

    this.formulario.patchValue({
       endereco: {
           cep: dados.cep,
           numero: '',
           complemento: dados.complemento,
           rua: dados.logradouro,
           bairro: dados.bairro,
           cidade: dados.localidade,
           estado: dados.uf
        }
    })
  }

  resetaDadosFormulario(){
    this.formulario.patchValue({
      endereco: {
          numero: '',
          complemento: null ,
          rua: null,
          bairro: null,
          cidade: null,
          estado:null
      }
    })
  }
  submit(): any {
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: any, i: any) => v ? this.frameworks[i] : null)
      .filter((v:any) => v !== null)
    });

    this.http
        .post('https://httpbin.org/post', JSON.stringify({}))
        .subscribe(
          dados => {
            // reseta o form
            // this.formulario.reset();
            // this.resetar();
          },
          (error: any) => alert('erro')
        );
  }

    compararCargos(obj1: any, obj2:any) {
      return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
    }
// validações assíncrona
    validarEmail(formControl: FormControl) {
      return this.verificaEmailService.verificarEmaill(formControl.value)
        .pipe(
          map(emailExiste => emailExiste ? { emailInvalido: true } : null)
          );
    }

  ngOnInit() {
  // this.formulario  = new FormGroup({
  //   nome: new FormControl(null),
  //   email: new FormControl(null)
  // });

    this.verificaEmailService.verificarEmaill('email@email.com').subscribe();
    this.dropdDownService.getEstados()
    .subscribe(estados => {
       this.estados = estados

       this.dropdDownService.getCidades(this.estados[0].id)
       .subscribe( cidades => this.cidades = cidades);
      });




      this.cargos = this.dropdDownService.getCargos();
      this.tecnologias = this.dropdDownService.getTecnologias();
      this.newsLetterOp = this.dropdDownService.getNewsLetter();

      this.formulario.get('endereco.cep')?.statusChanges
           .pipe(
              distinctUntilChanged(),
              switchMap(status => status === 'VALID' ?
                this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value):
               empty()
            )
           ).subscribe((endereco: any) =>  endereco ? this.populaDadosForm(endereco) : {});

           this.formulario.get('endereco.estado').valueChanges
                .pipe(
                    tap(estado => console.log('Novo estado: ', estado)),
                    map(estado => this.estados.filter(e => e.sigla === estado)),
                    map((estados: any) => estados && estados?.length > 0 ? estados[0]?.id : empty()),
                    switchMap((estadoId: number) => this.dropdDownService.getCidades(estadoId)),
                    tap(console.log)
                )
           .subscribe((cidades: any) => this.cidades = cidades);
  }
}
