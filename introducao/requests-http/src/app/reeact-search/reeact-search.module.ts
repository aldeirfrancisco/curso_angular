import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReeactSearchRoutingModule } from './reeact-search-routing.module';
import { LibSearchComponent } from './lib-search/lib-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibSearchComponent
  ],
  imports: [
    CommonModule,
    ReeactSearchRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReeactSearchModule { }
