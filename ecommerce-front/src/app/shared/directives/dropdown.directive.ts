import { Directive, ElementRef, HostBinding, HostListener, input, output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ecomDropdown]'
})
export class DropdownDirective {
  open = input<boolean>(false);
  clickOutside = output<MouseEvent>();

  constructor(private el: ElementRef, private renderer: Renderer2, private _elem: ElementRef) {
  }
  ngOnChanges() {
    const elem = this._elem.nativeElement.querySelector(".dropdown-menu");
    if (this.open()) {
      this.renderer.removeClass(elem, "hidden");
    } else {
      this.renderer.addClass(elem, "hidden");
    }
  }

  @HostListener("document:click", ["$event", "$event.target"])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickInside = this._elem.nativeElement.contains(targetElement);
    if (!clickInside && this.open()) {
      this.clickOutside.emit(event);
    }
  }

}
