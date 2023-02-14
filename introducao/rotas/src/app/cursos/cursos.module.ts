import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { AppRoutingModule } from "../app-routing.module";

import { CursosComponent } from "./cursos.component";
import { CursosRoutingModule } from "./cursos.routing.module";
import { CursosService } from "./cursos.service";
import { DetalheCursoComponent } from "./detalhe-curso/detalhe-curso.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        MatListModule,
        CursosRoutingModule
    ],
    exports: [],
    declarations: [
      CursosComponent,
      DetalheCursoComponent
    ],
    providers:[CursosService]
    
})
export class CursosModule {

}