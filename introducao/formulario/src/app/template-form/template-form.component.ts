import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
    
  //[(ngModel)] two-way data binding, muda o objeto original 
  //[ngModel] property binding, não muda o objeto original

  pessoa: any = {
    nome: "aldeir",
    email: "dide123francisco@gmail.com"
  }
  onSubmit(form:NgForm): void{
  console.log("aqui ",form);
  
  
  }
}
