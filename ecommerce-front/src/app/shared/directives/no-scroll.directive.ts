import { DOCUMENT } from '@angular/common';
import { Directive, inject, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[ecomNoScroll]'
})
export class NoScrollDirective implements OnInit, OnDestroy {
  document: Document = inject(DOCUMENT)
  constructor() { }
  ngOnInit(): void {
    this.document.body.classList.add('overflow-hidden')
  }
  ngOnDestroy(): void {
    this.document.body.classList.remove('overflow-hidden')
  }
}
