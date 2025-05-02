import { Component, inject } from '@angular/core';
import { HomeServices } from '../../services/home-services.service';

@Component({
  selector: 'ecom-filter-keyword',
  imports: [],
  templateUrl: './filter-keyword.component.html',
  styleUrl: './filter-keyword.component.scss'
})
export class FilterKeywordComponent {
  homeService = inject(HomeServices)

  onChanageProduct(value: string) {
    this.homeService.productKeyword.set(value)
  }
}
