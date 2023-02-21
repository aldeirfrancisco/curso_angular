import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
    
  formulario: FormGroup;

  constructor(private  formBuilder: FormBuilder, private http: HttpClient){
    this.formulario = this.formBuilder.group({
      nome: [null],
      email:[null]
    })
  }
  onSubmit(): void{
    console.log("aqui ",this.formulario.value);
    this.http.get(`https://viacep.com.br/ws/${71555013}/json`)
    .subscribe((endereco) => console.log(endereco));
    }
  ngOnInit() {
  // this.formulario  = new FormGroup({
  //   nome: new FormControl(null),
  //   email: new FormControl(null)
  // });
  }
}
