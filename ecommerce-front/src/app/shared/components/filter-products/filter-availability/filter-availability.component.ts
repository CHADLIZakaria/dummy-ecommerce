import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ecom-filter-availability',
  imports: [],
  templateUrl: './filter-availability.component.html',
  styleUrl: './filter-availability.component.scss'
})
export class FilterAvailabilityComponent {
  availability = input.required<number | null | undefined>()
  onChangeAvailabilty = output<boolean>()

  onToggleAvailability(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onChangeAvailabilty.emit(checked)
  }
}
