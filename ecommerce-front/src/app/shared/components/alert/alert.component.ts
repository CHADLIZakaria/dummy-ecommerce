import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ecom-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  showAlert = output<void>();
  message = input.required<string>()

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName.includes('move-width')) {
      this.showAlert.emit()
    }
  }
}
