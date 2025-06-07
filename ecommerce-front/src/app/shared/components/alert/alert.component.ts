import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ecom-alert',
  imports: [RouterLink],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  showAlert = output<void>();
  link = input<{title: string, url: string}>();
  message = input.required<string>()
  

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName.includes('move-width')) {
      this.showAlert.emit()
    }
  }
}
