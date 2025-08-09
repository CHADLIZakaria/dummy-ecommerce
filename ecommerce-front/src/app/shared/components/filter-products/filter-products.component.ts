import { Component, input } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { FilterKeywordComponent } from './filter-keyword/filter-keyword.component';
import { FilterAvailabilityComponent } from './filter-availability/filter-availability.component';
import { FilterBrandComponent } from './filter-brand/filter-brand.component';

@Component({
  selector: 'ecom-filter-products',
  imports: [TitleComponent, FilterKeywordComponent, FilterAvailabilityComponent, FilterBrandComponent],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.scss'
})
export class FilterProductsComponent {
  keyword = input.required<string>()

}
