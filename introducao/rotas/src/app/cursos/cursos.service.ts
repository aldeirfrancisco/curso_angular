import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  getCursos():any{
   return [{id: 1, nome:"angular"}, {id: 2 ,nome:"java"},{id: 3 ,nome: "javaScript"}]
  }
}
