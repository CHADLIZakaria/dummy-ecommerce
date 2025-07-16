import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { StarCountPipe } from "../../../shared/pipes/star-count.pipe";
import { StarPercentagePipe } from "../../../shared/pipes/star-percentage.pipe";
import { ProductDetailsService } from '../services/product-details.service';
import { WriteReviewComponent } from "../popup/write-review/write-review.component";
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'ecom-reviews',
  imports: [CommonModule, StarCountPipe, StarPercentagePipe, DropdownDirective, LoadingComponent, WriteReviewComponent, TitleComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  productDetailsService = inject(ProductDetailsService)
  reviewResource = this.productDetailsService.reviewsResource
  reviews = computed(() => this.reviewResource.value().data.data);
  numberStar = EcomHelper.range(5)
  arrayPagination = computed(() => 
    EcomHelper.range(Math.ceil((this.reviewResource.value().data.totalElements/this.reviewResource.value().data.size)))
  )

  onChangeSort(column: string, order: string) {
    this.productDetailsService.sort.set({
      ...this.productDetailsService.sort(),
      column,
      order,
      page: 0
    })
  }

  onChangePage(page: number) {
    this.productDetailsService.sort.set({
      ...this.productDetailsService.sort(),
      page
    })
  }

  onChangeSize(size: number) {
    this.productDetailsService.sort.set({
      ...this.productDetailsService.sort(),
      size
    })
  }  

}
