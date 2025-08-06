import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { ProductDetails } from '../../../../shared/model/ecom.model';
import { UserService } from '../../../../shared/services/user.service';
import { CartItem } from '../../../home/models/home.model';
import { ProductDetailsService } from '../../services/product-details.service';

@Component({
  selector: 'ecom-product-details-info',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-details-info.component.html',
  styleUrl: './product-details-info.component.scss'
})
export class ProductDetailsInfoComponent {
  productDetailsService = inject(ProductDetailsService);
  userService = inject(UserService)
  formBuilder = inject(FormBuilder)
  productDetailsResource = this.productDetailsService.productDetailsResource
  numberStar = EcomHelper.range(5)
  alert = {show: false, message: '', type: ''};
  quantityForm = this.formBuilder.group({
    quantity: [1]
  })
  currentImage = 0;
  currentIndex = 0;

get visibleImages() {
  const images = this.productDetailsService.productDetailsResource.value().data.images;
  const total = images.length;
  console.log(total)
  console.log(this.currentIndex)
  if (this.currentIndex+3 >= total) {
    this.currentIndex = Math.max(total - 3, 0);
  }
  if (this.currentIndex < 0) {
    this.currentIndex = 0;
  }
  return images.slice(this.currentIndex, this.currentIndex + 3);
}

  incrementImageWindow() {
    if (this.currentIndex + 3 < this.productDetailsService.productDetailsResource.value().data.images.length) {
      this.currentIndex += 3;
    }
  }

  decrementImageWindow() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 3;
    }
  }

  changeCurrentImage(index: number) {
    this.currentImage =  index;
  }

  toggleFavorite(idProduct: number) {
    this.userService.toggleFavorite(idProduct).subscribe(
      data => {
        if(data.status===200) {
          this.alert = {type: 'favorite', show: true, message: data.data.message}
          this.productDetailsResource.value().data.isFavorite = !this.productDetailsResource.value().data.isFavorite          
        }
      }
    )
  }

  onIncrementQuantity() {
    const current = this.quantityForm.get('quantity')?.value || 1;
    this.quantityForm.get('quantity')?.setValue(current + 1);
  }

  onDecrementQuantity() {
    const current = this.quantityForm.get('quantity')?.value || 1;
    if (current > 1) {
      this.quantityForm.get('quantity')?.setValue(current - 1);
    }
  }
  
  onAddToCart(product: ProductDetails) {
    const cartItem: CartItem = {
      productImage: product.coverImage,
      productName: product.name,
      price: product.price,
      quantity: 1
    }
    this.userService.addCart(cartItem).subscribe(data => {
      if(data.status===200) {
        this.alert = {type: 'cart', show: true, message: data.message}
      }
    })
  }
}
