import { Directive, ElementRef, HostListener, output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ecomDropdown]',
  exportAs: 'ecomDropdown'
})
export class DropdownDirective {
  isOpen = false;
  clickOutside = output<MouseEvent>();
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.setDropdownVisible(this.isOpen)
  }
  closeDropdown() {
    this.isOpen = false
    this.setDropdownVisible(false);
  }
  setDropdownVisible(visible: boolean) {
    const dropdownMenuElem = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    if(dropdownMenuElem) {
      if (visible) {
        this.renderer.removeClass(dropdownMenuElem, 'hidden');
      }
      else {
        this.renderer.addClass(dropdownMenuElem, 'hidden');
      }
    }
  }

  @HostListener('document:click', ['$event, $event.target'])
  onDocumentClick(event: MouseEvent, target: HTMLElement) {
    const clickInside = this.elementRef.nativeElement.contains(target)
    if(!clickInside && this.isOpen) {
      this.closeDropdown()
      this.clickOutside.emit(event);
    }
  }
}
