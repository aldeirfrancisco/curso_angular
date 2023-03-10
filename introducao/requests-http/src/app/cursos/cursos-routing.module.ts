
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursoFormComponent } from './curso-form/curso-form.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursoResolverGuard } from './guards/curso-resolver.guard'

const routes: Routes = [
  { path: '', component: CursosListaComponent},
  {
    path: 'novo',
    component: CursoFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  },
  {
     path: 'editar/:id',
     component: CursoFormComponent,
     resolve: {
      curso: CursoResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
