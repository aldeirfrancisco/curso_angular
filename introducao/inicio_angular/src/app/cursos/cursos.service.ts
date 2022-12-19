import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }
  
  getCursos(){
    return ["curso 1","curso 2","curso 3"]
  }
}
