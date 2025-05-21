import { Component } from '@angular/core';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { FilterCategoryComponent } from "./filter-category/filter-category.component";
import { FilterPriceComponent } from "./filter-price/filter-price.component";
import { FilterKeywordComponent } from "./filter-keyword/filter-keyword.component";
import { FilterBrandComponent } from "./filter-brand/filter-brand.component";
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';

@Component({
  selector: 'ecom-filters',
  imports: [
    TitleComponent, 
    FilterCategoryComponent,
    FilterPriceComponent,
    FilterKeywordComponent,
    FilterBrandComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  open = false
  closeDropDown() {
    this.open = false;
  }
  closeOnClick() {
    this.open = false;
  }
}
