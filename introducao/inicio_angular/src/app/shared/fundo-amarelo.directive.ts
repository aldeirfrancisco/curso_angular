import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor( private _elementRef: ElementRef,
               private _renderer2: Renderer2 ) {
          this._renderer2.setStyle(this._elementRef.nativeElement, 
                                    "background-color",
                                    'yellow')
     

   }

}
