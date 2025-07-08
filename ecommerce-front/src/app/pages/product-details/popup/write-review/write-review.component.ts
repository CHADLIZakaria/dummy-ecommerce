import { Component, inject, input } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { ProductDetailsService } from '../../services/product-details.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../shared/services/user.service';
import { LoginService } from '../../../login/services/login.service';

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
      console.log(data)
      //this.onClosePopup()
    })
  }
  
  onClosePopup() {
    this.productDetailsService.showWritePopup.set(false)
  }
}
