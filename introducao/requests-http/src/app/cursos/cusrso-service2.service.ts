import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CusrsoService2Service extends CrudService<Curso> {


  constructor( protected  htt: HttpClient) {
    super(htt, 'http://localhost:3000/cursos')


   }

}
