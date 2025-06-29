import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { EcomHelper } from '../../shared/helper/ecomHelper';
import { ProductDetails } from '../../shared/model/ecom.model';
import { ImageService } from '../../shared/services/image.service';
import { UserService } from '../../shared/services/user.service';
import { CartItem } from '../home/models/home.model';
import { ReviewsComponent } from "./reviews/reviews.component";
import { ProductDetailsService } from './services/product-details.service';
import { TitleComponent } from "../../shared/components/title/title.component";

@Component({
  selector: 'ecom-product-details',
  imports: [ReviewsComponent, CommonModule, AlertComponent, LoadingComponent, TitleComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productDetailsService = inject(ProductDetailsService);
  productDetailsResource = this.productDetailsService.productDetailsResource
  userService = inject(UserService)
  numberStar = EcomHelper.range(5)
  imageService = inject(ImageService)
  currentImage: number = 0
  alert = {show: false, message: '', type: ''};

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      this.productDetailsService.slug.set(slug)
    }
  }
  
  changeCurrentImage(index: number) {
    this.currentImage = index
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
