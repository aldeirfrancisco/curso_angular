
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit{
    
  //[(ngModel)] two-way data binding, muda o objeto original 
  //[ngModel] property binding, não muda o objeto original
  constructor(private http: HttpClient){

  }
  pessoa: any = {
    nome: "aldeir",
    email: "dide123francisco@gmail.com"
  }
  onSubmit(form:NgForm): void{
  console.log("aqui ",form);
 
  }

  consultaCEP(cep: any): void {
    
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)) {
        console.log(cep);
        this.http.get(`https://viacep.com.br/ws/${cep}/json`).subscribe(
          (endereco) => {
            console.log(endereco);
            
          }
        )
      }


    }

  }
  
  ngOnInit(){
  (() => {
     
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
     
        if (!form) {
          event.preventDefault()
          event.stopPropagation()
        }
  
       form.classList.add('was-validated')
      }, false)
    })
  })()
 }
  
}
