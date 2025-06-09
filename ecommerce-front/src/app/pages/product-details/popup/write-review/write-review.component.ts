import { Component, inject } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { ProductDetailsService } from '../../services/product-details.service';

@Component({
  selector: 'ecom-write-review',
  imports: [NoScrollDirective],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.scss'
})
export class WriteReviewComponent {
  numberStar = EcomHelper.range(5)
  rating = 1
  productDetailsService = inject(ProductDetailsService)
}
