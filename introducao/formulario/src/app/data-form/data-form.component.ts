
import { Estadosbr } from './../shared/models/estadosbr';
import { DropdownService } from '../shared/services/dropdown.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
   estados: Estadosbr[] = [];

  constructor(private  formBuilder: FormBuilder,
              private dropdDownService: DropdownService,
              private cepService: ConsultaCepService){

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email:[null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
          cep: [null, Validators.required],
          numero:[null, Validators.required],
          complemento:[null],
          rua:[null, Validators.required],
          bairro:[null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required]
      })
    })
  }

  consultaCEP(): void {

   let cep = this.formulario.get('endereco.cep')?.value;
        this.resetaDadosFormulario();
          if(cep != null || cep !== ''){
          this.cepService.consultaCEP(cep)
          .subscribe((endereco) => this.populaDadosForm(endereco));
          }
      }


  populaDadosForm(dados: any){

    this.formulario.patchValue({
       endereco: {
           cep: dados.cep,
           numero: '',
           complemento: dados.complemento ,
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
    if(this.formulario.valid){
      this.cepService.consultaCEP(71555013)
        .subscribe((endereco) => {
          console.log(endereco)
          // this.formulario.reset();
        }, (error: any)=> alert("error"));

     } else {
      console.log("invalid");
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
      if(erroEmail?.errors){
        return erroEmail.errors['email'] && erroEmail.touched;
      }
    }
  ngOnInit() {
  // this.formulario  = new FormGroup({
  //   nome: new FormControl(null),
  //   email: new FormControl(null)
  // });
    this.dropdDownService.getEstados()
      .subscribe(estados => this.estados = estados);
  }
}
