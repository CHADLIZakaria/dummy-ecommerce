import { Component } from '@angular/core';
import { dropDownAnimation } from '../../../../shared/animations/animations';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';

@Component({
  selector: 'ecom-filter-brand',
  imports: [DropdownDirective],
  templateUrl: './filter-brand.component.html',
  styleUrl: './filter-brand.component.scss',
  animations: [dropDownAnimation]
})
export class FilterBrandComponent {

}
