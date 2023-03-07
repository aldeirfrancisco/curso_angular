
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent {

  formulario: any;

  constructor() { }

  abstract submit(): any;

  resetar():void{
    this.formulario.reset();
  }

  verificaValidTouched(campo:string){
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
   }

   verificaRequired(campo: string) {
    return (
      this.formulario.get(campo).hasError('required') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
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
  onSubmit(): void {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

}
