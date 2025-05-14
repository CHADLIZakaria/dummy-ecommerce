import { Component, inject } from '@angular/core';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { ProductDetailsService } from '../services/product-details.service';
import { NumberPipe } from '../../../shared/pipes/number.pipe';
import { StarCountPipe } from "../../../shared/pipes/star-count.pipe";
import { StarPercentagePipe } from "../../../shared/pipes/star-percentage.pipe";
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'ecom-reviews',
  imports: [NumberPipe, StarCountPipe, StarPercentagePipe, DropdownDirective, LoadingComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  productDetailsService = inject(ProductDetailsService)
  reviewResource = this.productDetailsService.reviewsResource
  numberStar = EcomHelper.range(5)

  onChangeSort(column: string, order: string) {
    this.productDetailsService.sort.set({
      column,
      order
    })
  }
    

}
