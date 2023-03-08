import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modeal',
  templateUrl: './alert-modeal.component.html',
  styleUrls: ['./alert-modeal.component.css']
})
export class AlertModealComponent implements OnInit {

  @Input()message: string = '';
  @Input()type: string = 'success';

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {}

  onClose(){
   this.bsModalRef.hide();
  }

}
