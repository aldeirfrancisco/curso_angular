import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { InputOutputPropertiesComponent } from './input-output-properties/input-output-properties.component';
import { OutputPropertiesComponent } from './output-properties/output-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    MeuPrimeiroComponent,
    InputOutputPropertiesComponent,
    OutputPropertiesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
