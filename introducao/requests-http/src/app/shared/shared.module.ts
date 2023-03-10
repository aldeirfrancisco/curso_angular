import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModealComponent } from './alert-modeal/alert-modeal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [AlertModealComponent, ConfirmModalComponent],
  imports: [
    CommonModule
  ],
 exports: [AlertModealComponent],
 // alertModealComponent vai ser chamada em tempo de execução,
 //"vai ser instanciado em tempo de execução ai usar o 'entryComponents: [AlertModealComponent] '"
 entryComponents: [AlertModealComponent, ConfirmModalComponent]

})
export class SharedModule { }
