import { Component } from '@angular/core';
import { FilterBrandComponent } from "./filter-brand/filter-brand.component";
import { FilterCategoryComponent } from "./filter-category/filter-category.component";
import { FilterKeywordComponent } from "./filter-keyword/filter-keyword.component";
import { FilterPriceComponent } from "./filter-price/filter-price.component";
import { TitleComponent } from '../../../../../shared/components/title/title.component';
import { FilterAvailabilityComponent } from "./filter-availability/filter-availability.component";

@Component({
  selector: 'ecom-filters',
  imports: [
    TitleComponent,
    FilterCategoryComponent,
    FilterPriceComponent,
    FilterKeywordComponent,
    FilterBrandComponent,
    FilterAvailabilityComponent
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
