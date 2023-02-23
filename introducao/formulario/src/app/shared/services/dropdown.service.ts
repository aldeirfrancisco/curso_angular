
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estadosbr } from '../models/estadosbr';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstados(){
    return this.http.get<Estadosbr[]>('assets/dados/estadosBR.json');
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'ruby', desc: 'Ruby' }
    ];
  }
}
