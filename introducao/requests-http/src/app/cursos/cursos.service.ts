
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Curso } from './curso';
import { delay, take,tap } from 'rxjs';

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

  create(curso: any){
    console.log("aqui ",curso);
    return this.http.post(this.APi, curso).pipe(
      tap(console.log),
      take(1));
  }

  loadByID(id: number){
    return this.http.get<Curso>(`${this.APi}/${id}`)
    .pipe(
     take(1)
    );
  }
}
