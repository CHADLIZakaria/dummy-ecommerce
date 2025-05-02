import { Component, inject } from '@angular/core';
import { dropDownAnimation } from '../../../../shared/animations/animations';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { HomeServices } from '../../services/home-services.service';

@Component({
  selector: 'ecom-filter-category',
  imports: [DropdownDirective],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.scss',
  animations: [dropDownAnimation]
})
export class FilterCategoryComponent {
  homeService = inject(HomeServices)
  categories = this.homeService.categoriesWithNumberProductResource
  open = false;
  
  onSearchCategory(value: string) {
    this.homeService.categoryKeyword.set(value)
  }
  
}
