import { Directive, ElementRef,  HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mouse]'
})
export class HighlightMouseDirective {
 

  @HostListener('mouseenter') onMouseOver(){
    this._renderer2.setStyle(this._elementRef.nativeElement, 
      "background-color",
      'yellow')
  }
  @HostListener('mouseleave') onMouseleave(){
    this._renderer2.setStyle(this._elementRef.nativeElement, 
      "background-color",
      'white')
  }
  constructor( private _elementRef: ElementRef,
    private _renderer2: Renderer2 ) {

      
     }

}
