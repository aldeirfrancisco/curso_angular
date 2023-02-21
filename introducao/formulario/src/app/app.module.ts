import { DataFormModule } from './data-form/data-form.module';
import { TemplateFormModule } from './template-form/template-form.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataFormComponent } from './data-form/data-form.component';

@NgModule({
  declarations: [
    AppComponent,
   
    DataFormComponent,
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateFormModule,
    DataFormModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
