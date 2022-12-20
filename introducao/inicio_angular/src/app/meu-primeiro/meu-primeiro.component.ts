import { Component, OnInit} from "@angular/core";

@Component({
    selector: 'meu-primeiro-component', 
    templateUrl: './meu-primeiro.component.html',
    styleUrls: ['./meu-primeiro.component.html.css']
    
})
export class MeuPrimeiroComponent  implements OnInit{

    nomeCurso: string = ' 1 curso silva';
    nome: string = '2 silva';
    aqui: string = '3 silva';


    constructor(){}
    ngOnInit(): void {  
    }
}