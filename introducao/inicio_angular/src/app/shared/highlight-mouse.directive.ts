import { Directive, ElementRef,  HostBinding,  HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mouse]'
})
export class HighlightMouseDirective {
 
 private backgroundColor: string
  @HostListener('mouseenter') onMouseOver(){
    // this._renderer2.setStyle(this._elementRef.nativeElement, 
    //   "background-color",
    //   'yellow')
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseleave(){
    // this._renderer2.setStyle(this._elementRef.nativeElement, 
    //   "background-color",
    //   'white')
    this.backgroundColor = 'white';
  }
   //HostBinding metadado permiti que faça a 
   //associação de um atributo da diretiva com um atributo do htm
  @HostBinding('style.backgroundColor') get setColor(){
    return this.backgroundColor;
  }

  constructor( 
    // private _elementRef: ElementRef,
    // private _renderer2: Renderer2
     ) {

      
     }

}
