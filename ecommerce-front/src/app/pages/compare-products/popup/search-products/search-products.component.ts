import { Component, computed, inject } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { Product } from '../../../../shared/model/ecom.model';
import { CompareProductsService } from './services/compare-products.service';

@Component({
  selector: 'ecom-search-products',
  imports: [NoScrollDirective],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss'
})
export class SearchProductsComponent {
  compareProductsService = inject(CompareProductsService)
  compareProductsResource = this.compareProductsService.searchProductResource
  products = computed(() =>  this.compareProductsResource.value().data.data)

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.compareProductsService.keyword.set(value)
  }

}
