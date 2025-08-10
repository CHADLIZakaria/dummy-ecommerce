import { Component, input } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { FilterKeywordComponent } from './filter-keyword/filter-keyword.component';
import { FilterAvailabilityComponent } from './filter-availability/filter-availability.component';
import { FilterBrandComponent } from './filter-brand/filter-brand.component';
import { FilterCategoryComponent } from './filter-category/filter-category.component';
import { FilterPriceComponent } from './filter-price/filter-price.component';

@Component({
  selector: 'ecom-filter-products',
  imports: [TitleComponent, FilterKeywordComponent, FilterAvailabilityComponent, FilterBrandComponent, FilterCategoryComponent, FilterPriceComponent],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.scss'
})
export class FilterProductsComponent {
  keyword = input.required<string>()

}
