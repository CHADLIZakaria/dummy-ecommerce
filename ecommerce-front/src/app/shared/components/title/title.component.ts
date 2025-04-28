import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'ecom-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  title = input<string>()
  subtitle = input<string>()

}
