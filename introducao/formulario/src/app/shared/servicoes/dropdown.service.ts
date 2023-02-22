
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
}
