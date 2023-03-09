import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {

  form: any;
  submitted = false;

  constructor(private fb: FormBuilder){}

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
    console.log(this.form.value);

  }

  onCancel(){
    this.submitted = false;
    this.form.reset()
  }
}
