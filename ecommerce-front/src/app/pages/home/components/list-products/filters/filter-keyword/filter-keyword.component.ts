import { Component, inject } from '@angular/core';
import { HomeServices } from '../../../../services/home-services.service';

@Component({
  selector: 'ecom-filter-keyword',
  imports: [],
  templateUrl: './filter-keyword.component.html',
  styleUrl: './filter-keyword.component.scss'
})
export class FilterKeywordComponent {
  homeService = inject(HomeServices)
  keyword = this.homeService.productFilter().keyword

  onChanageProduct(value: string) {
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(),
      keyword: value,
      page: 0
    })
  }
}
