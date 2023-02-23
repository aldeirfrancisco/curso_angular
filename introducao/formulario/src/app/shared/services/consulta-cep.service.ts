import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: any): Observable<Object> {
     cep = cep.replace(/\D/g, '');
     if (cep != "") {
       var validacep = /^[0-9]{8}$/;

       if(validacep.test(cep)) {
         // this.resetaDadosFormulario(form);
         return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
       }

     }
     return of({});
   }
}
