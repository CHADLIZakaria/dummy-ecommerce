import { Component } from '@angular/core';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { dropDownAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'ecom-filter-review',
  imports: [DropdownDirective],
  templateUrl: './filter-review.component.html',
  styleUrl: './filter-review.component.scss',
  animations: [
    dropDownAnimation
  ]
})
export class FilterReviewComponent {
  stars = Array.from(Array(5).keys()).reverse()
  open = false;
}
