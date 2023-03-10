import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModealComponent } from './alert-modeal/alert-modeal.component';

 export enum AlertTypes{
    DANGER = 'danger',
    SUCCESS = 'success'
 }
@Injectable({
  providedIn: 'root'
})
export class AlertModelServiceService {

    constructor( private modalService: BsModalService) { }



    showAlertDanger(message: string){
       this.showAlert(message, AlertTypes.DANGER)
    }

    showAlertSuccess(message: string){
      this.showAlert(message, AlertTypes.SUCCESS, 3000)
    }


    private showAlert(msn: string, type: string, dismissTimeout?: number){
      const bsModalRef: BsModalRef = this.modalService.show(AlertModealComponent);
            bsModalRef.content.type= type;
            bsModalRef.content.message= msn;

            if (dismissTimeout) {
              setTimeout(() => bsModalRef.hide(), dismissTimeout);
            }
    }
}
