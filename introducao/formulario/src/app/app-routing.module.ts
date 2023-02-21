import { AppComponent } from './app.component';
import { DataFormComponent } from './data-form/data-form.component';

import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [ 

    {path: 'tempateForm', component: TemplateFormComponent},
    {path: 'dataForm', component: DataFormComponent},
    {path: '', component: DataFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
