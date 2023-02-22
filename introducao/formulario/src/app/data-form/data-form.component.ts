import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
    
  formulario: FormGroup;

  constructor(private  formBuilder: FormBuilder, private http: HttpClient){
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
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
       
      if(validacep.test(cep)) {
        // this.resetaDadosFormulario(form);
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe((endereco) => this.populaDadosForm(endereco));
      }


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
    console.log("aqui ",this.formulario);
    this.http.get(`https://viacep.com.br/ws/${71555013}/json`)
    .subscribe((endereco) => {
      console.log(endereco)
      // this.formulario.reset();
    }, (error: any)=> alert("error"));
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
  }
}
