import { Directive, HostBinding, HostListener, output } from '@angular/core';

@Directive({
  selector: '[ecomDragDrop]'
})
export class DragDropDirective {
  onFileDropped = output<File[]>();
  @HostBinding("class.fileover")
  fileOver: boolean = false;
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    this.fileOver = true
  }
  @HostListener('dragleave', ['$event']) onDragLeave(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    this.fileOver = false
  }
  @HostListener('drop', ['$event']) onDrop(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    this.fileOver = false
    if(evt.dataTransfer?.files.length) {
      const files = Array.from(evt.dataTransfer.files)
      this.onFileDropped.emit(files)
    }
  }
  
}
