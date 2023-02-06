import { EventEmitter, Injectable } from "@angular/core";

 @Injectable()
 export class PessoaService {
 nome: string =  "aldeir";

 emitirCursoCriado = new EventEmitter<string>();
 static criouNovoCurso = new EventEmitter<string>();

 addCurso(curso: string){

    this.emitirCursoCriado.emit(curso);
    PessoaService.criouNovoCurso.emit(curso);
}

}