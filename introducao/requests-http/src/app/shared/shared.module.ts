import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModealComponent } from './alert-modeal/alert-modeal.component';



@NgModule({
  declarations: [AlertModealComponent],
  imports: [
    CommonModule
  ],
 exports: [AlertModealComponent],
 // alertModealComponent vai ser avaliado em tempo de execução,
 //"vai ser instanciado em tempo de execução ai usar o 'entryComponents: [AlertModealComponent] '"
 entryComponents: [AlertModealComponent]

})
export class SharedModule { }
