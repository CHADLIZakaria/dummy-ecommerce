import { Directive, ElementRef, HostBinding, HostListener, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ecomDropdown]',
  exportAs: 'dropDownToggle'
})
export class DropdownDirective {
/*  isHidden = true;
  ecomDropdown = input.required<string>();
  constructor(private render: Renderer2, private el: ElementRef) { }
  
  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    event.stopPropagation()
    this.isHidden = !this.isHidden
    const menu = document.querySelector(this.ecomDropdown())
    if(menu) {
      if(this.isHidden) {
        this.render.removeClass(menu, "hidden")
      }
      else {
        console.log("click")
        this.render.addClass(menu, "hidden")
      }
    }
  }
*/
  isOpen = false;
  toggle() {
    console.log('click'+ this.isOpen)
    this.isOpen = !this.isOpen
  }
}
