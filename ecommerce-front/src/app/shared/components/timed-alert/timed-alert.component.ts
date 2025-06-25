import { Component } from '@angular/core';
import { FadeInOut } from '../../animations/animations';

@Component({
  selector: 'ecom-timed-alert',
  imports: [],
  templateUrl: './timed-alert.component.html',
  styleUrl: './timed-alert.component.scss',
  animations: [FadeInOut(200, 300, true)]
})
export class TimedAlertComponent {
  errorMessage = 'this error message'
}
