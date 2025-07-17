import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { LoginService } from '../../../login/services/login.service';
import { ReviewsService } from '../../reviews/services/reviews.service';
import { ProductDetailsService } from '../../services/product-details.service';

@Component({
  selector: 'ecom-write-review',
  imports: [NoScrollDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.scss'
})
export class WriteReviewComponent {
  numberStar = EcomHelper.range(5)
  loginService = inject(LoginService)
  productDetailsService = inject(ProductDetailsService)
  reviewsService = inject(ReviewsService)
  formBuilder = inject(FormBuilder)
  formWriteReview = this.formBuilder.group({
    rating: [1],
    messsage: ['']
  })

  onChangeRating(value: number)  {
    this.formWriteReview.patchValue({
      rating: value
    })
  }

  onSaveReview() {
    this.productDetailsService
    .addReview({
      comment: this.formWriteReview.value.messsage!,
      rating: this.formWriteReview.value.rating!,
      username: this.loginService.user()?.username!,
      slugProduct: this.productDetailsService.slug()
    }).
    subscribe(data => {
      if(data.status === 201) {
        this.reviewsService.sort.set({
          ...this.reviewsService.sort(),
          page: 0
        })
        this.onClosePopup()
      }
    })
  }
  
  onClosePopup() {
    this.productDetailsService.showWritePopup.set(false)
  }
}
