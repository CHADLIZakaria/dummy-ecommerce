import { Component, inject } from '@angular/core';
import { dropDownAnimation } from '../../../../shared/animations/animations';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { HomeServices } from '../../services/home-services.service';

@Component({
  selector: 'ecom-filter-brand',
  imports: [DropdownDirective],
  templateUrl: './filter-brand.component.html',
  styleUrl: './filter-brand.component.scss',
  animations: [dropDownAnimation]
})
export class FilterBrandComponent {
  homeService = inject(HomeServices)
  brandsWithNumberProductsResource = this.homeService.brandsWithNumberProductsResource
  open = false;
  
  onSearchBrand(value: string) {
    this.homeService.brandKeyword.set(value)
  }
 
}
