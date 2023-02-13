import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-curso',
  templateUrl: './detalhe-curso.component.html',
  styleUrls: ['./detalhe-curso.component.css']
})
export class DetalheCursoComponent implements OnInit {

  id: number = 1;
  curso: any;
  constructor(private route: ActivatedRoute){
    console.log(this.route);
    
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
      this.id = params['id']
    })
  }

  ngOnDestroy(){}
}
