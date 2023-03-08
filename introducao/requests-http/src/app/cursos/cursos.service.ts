
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Curso } from './curso';
import { delay } from 'rxjs';

//httpClient não precisa transformar o json manualmente e o http precisar.
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly APi = 'http://localhost:3000/cursos';
  constructor( private http: HttpClient) { }

  list(){
    return this.http.get<Curso[]>(this.APi)
    .pipe(
      delay(2000)
    );
  }
}
