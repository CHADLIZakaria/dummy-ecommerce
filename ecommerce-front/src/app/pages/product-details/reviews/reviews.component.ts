import { Component, inject } from '@angular/core';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { ProductDetailsService } from '../services/product-details.service';
import { NumberPipe } from '../../../shared/pipes/number.pipe';
import { StarCountPipe } from "../../../shared/pipes/star-count.pipe";
import { StarPercentagePipe } from "../../../shared/pipes/star-percentage.pipe";

@Component({
  selector: 'ecom-reviews',
  imports: [NumberPipe, StarCountPipe, StarPercentagePipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  productDetailsService = inject(ProductDetailsService)
  reviewResource = this.productDetailsService.reviewsResource
  numberStar = EcomHelper.range(5)
    

}
