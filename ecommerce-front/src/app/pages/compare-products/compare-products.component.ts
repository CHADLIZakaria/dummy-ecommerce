import { Component } from '@angular/core';
import { SearchProductsComponent } from "./popup/search-products/search-products.component";

@Component({
  selector: 'ecom-compare-products',
  imports: [SearchProductsComponent],
  templateUrl: './compare-products.component.html',
  styleUrl: './compare-products.component.scss'
})
export class CompareProductsComponent {

}
