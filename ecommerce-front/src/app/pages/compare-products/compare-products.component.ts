import { Component, inject } from '@angular/core';
import { SearchProductsComponent } from "./popup/search-products/search-products.component";
import { CompareProductsService } from './popup/search-products/services/compare-products.service';

@Component({
  selector: 'ecom-compare-products',
  imports: [SearchProductsComponent],
  templateUrl: './compare-products.component.html',
  styleUrl: './compare-products.component.scss'
})
export class CompareProductsComponent {
  compareProductsService = inject(CompareProductsService)

}
