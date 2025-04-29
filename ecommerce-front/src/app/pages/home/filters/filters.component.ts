import { Component } from '@angular/core';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { FilterCategoryComponent } from "./filter-category/filter-category.component";
import { FilterPriceComponent } from "./filter-price/filter-price.component";
import { FilterReviewComponent } from "./filter-review/filter-review.component";
import { FilterKeywordComponent } from "./filter-keyword/filter-keyword.component";
import { FilterBrandComponent } from "./filter-brand/filter-brand.component";

@Component({
  selector: 'ecom-filters',
  imports: [TitleComponent, FilterCategoryComponent, FilterPriceComponent, FilterReviewComponent, FilterKeywordComponent, FilterBrandComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

}
