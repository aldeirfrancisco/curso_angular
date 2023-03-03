import { distinctUntilChanged, empty, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Estadosbr } from './../shared/models/estadosbr';
import { DropdownService } from '../shared/services/dropdown.service';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/formValidations ';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados: Estadosbr[] = [];
  cargos: any[] = [];
  tecnologias: any[]= [];
  newsLetterOp: any[] = [];
  frameworks: any[] =['Angular', 'React', 'Vue', 'Sencha'];

  constructor(private  formBuilder: FormBuilder,
              private dropdDownService: DropdownService,
              private cepService: ConsultaCepService,
              private http: HttpClient,
              private verificaEmailService: VerificaEmailService){

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



  // consultaCEP(): void {

  //     let cep = this.formulario.get('endereco.cep')?.value;
  //       this.resetaDadosFormulario();
  //         if(cep != null || cep !== ''){
  //         this.cepService.consultaCEP(cep)
  //             .subscribe((endereco) => this.populaDadosForm(endereco));
  //         }
  // }


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
  onSubmit(): void{
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((v:any, i: any) => v ? this.frameworks[i] : null)
      .filter((v: any) => v !== null)
    });

    console.log(valueSubmit);

    if(this.formulario.valid){
    this.http
        .post('https://httpbin.org/post', JSON.stringify({}))
        .subscribe(
          dados => {
            console.log(dados);
            // reseta o form
            // this.formulario.reset();
            // this.resetar();
          },
          (error: any) => alert('erro')
        );

     } else {

      this.verificaValidacoesForm(this.formulario);

     }
  }

    verificaValidacoesForm(formGrupo: FormGroup){
        Object.keys(formGrupo.controls).forEach(campo =>{
          let controle = formGrupo.get(campo);
          controle?.markAsTouched();
          if(controle instanceof FormGroup){
            this.verificaValidacoesForm(controle);
          }
        })
    }

    resetar():void{
      this.formulario.reset();
    }
   verificaValidTouched(campo:string){

    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
   }
    aplicaCssErroInvalid(campo: string): any{
      return {
        'is-invalid': this.verificaValidTouched(campo),
      }
    }
    aplicaCssErroinvalidFeedback(campo: string): any{
      return {
        'invalid-feedback': !this.verificaValidTouched(campo),
      }
    }
    verificaEmailInvalido(){
      let erroEmail = this.formulario.get('email');

      if(erroEmail?.errors ){
        return erroEmail.errors['email'] && erroEmail.touched;
      }
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
      .subscribe(estados => this.estados = estados);
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
           ).subscribe((endereco) =>  endereco ? this.populaDadosForm(endereco) : {})

  }
}
