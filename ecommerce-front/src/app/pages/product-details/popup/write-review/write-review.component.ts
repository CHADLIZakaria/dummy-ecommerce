import { Component, inject } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { ProductDetailsService } from '../../services/product-details.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ecom-write-review',
  imports: [NoScrollDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.scss'
})
export class WriteReviewComponent {
  numberStar = EcomHelper.range(5)
  productDetailsService = inject(ProductDetailsService)
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
    this.onClosePopup()
  }
  
  onClosePopup() {
    this.productDetailsService.showWritePopup.set(false)
  }
}
