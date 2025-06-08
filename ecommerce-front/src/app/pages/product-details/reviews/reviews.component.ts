import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { StarCountPipe } from "../../../shared/pipes/star-count.pipe";
import { StarPercentagePipe } from "../../../shared/pipes/star-percentage.pipe";
import { ProductDetailsService } from '../services/product-details.service';
import { WriteReviewComponent } from "../popup/write-review/write-review.component";

@Component({
  selector: 'ecom-reviews',
  imports: [CommonModule, StarCountPipe, StarPercentagePipe, DropdownDirective, LoadingComponent, WriteReviewComponent],
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
