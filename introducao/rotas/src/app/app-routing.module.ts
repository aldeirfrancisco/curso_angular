import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { DetalheCursoComponent } from './cursos/detalhe-curso/detalhe-curso.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [

  {
    path: '' , component: NavComponent, children:[
      {path:'home',component: HomeComponent},
      {path:'login',component: LoginComponent},
      {path:'curso',component: CursosComponent},
      {path:'curso/:id',component: DetalheCursoComponent},
      
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
