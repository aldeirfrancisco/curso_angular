import { AbstractControl, FormArray, FormControl } from '@angular/forms';



export class FormValidations {



  static cepValidator(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido : true };
    }
    return null;
  }

 static requiredMinCheckbox(min = 1){
    const validador = (formArray: AbstractControl) =>{

      /*código funcional
       (total) valor acumulador,(current) valor a ser somado, expresao boolean, calculo, retorno, valor inicial.
      reduce( (total,  current) => current ? total + current : total, 0); */
      if (formArray instanceof FormArray) {
        console.log("formArray ",formArray);

      const totalChecked = formArray.controls
         .map(v => v.value)
         .reduce( (total,  current) => current ? total + current : total, 0);
       return totalChecked >= min ? null : {required: true};
      }

       throw new Error('formArray is not an instance of FormArray');
     }
    return validador;
  }

}
