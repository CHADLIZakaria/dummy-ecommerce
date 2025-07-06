import { Component, inject } from '@angular/core';
import { HomeServices } from '../../../../services/home-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ecom-filter-availability',
  imports: [CommonModule],
  templateUrl: './filter-availability.component.html',
  styleUrl: './filter-availability.component.scss'
})
export class FilterAvailabilityComponent {
  homeService = inject(HomeServices)

  onToggleAvailability(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(),
      quantity: checked ? 1 : null,
    });
  }
}
