import { Component } from '@angular/core';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { dropDownAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'ecom-filter-category',
  imports: [DropdownDirective],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.scss',
  animations: [dropDownAnimation]
})
export class FilterCategoryComponent {
  
}
