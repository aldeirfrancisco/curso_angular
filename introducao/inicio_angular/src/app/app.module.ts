import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { InputOutputPropertiesComponent } from './input-output-properties/input-output-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    MeuPrimeiroComponent,
    InputOutputPropertiesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
