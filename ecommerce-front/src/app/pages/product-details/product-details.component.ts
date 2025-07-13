import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ecom-product-details',
  imports: [ReviewsComponent, CommonModule, AlertComponent, LoadingComponent, TitleComponent, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
   animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
    ])
  ]
})
export class ProductDetailsComponent {
  productDetailsService = inject(ProductDetailsService);
  productDetailsResource = this.productDetailsService.productDetailsResource
  userService = inject(UserService)
  numberStar = EcomHelper.range(5)
  imageService = inject(ImageService)
  currentImage: number = 0
  alert = {show: false, message: '', type: ''};

  currentIndex = 0;
  visibleCount = 4;
  get visibleProducts() {
    return this.productDetailsService.productsSimularResource.value().data.slice(this.currentIndex, this.currentIndex + this.visibleCount);
  }

  next() {
    if (this.currentIndex + this.visibleCount < this.productDetailsService.productsSimularResource.value().data.length) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params =>{
      const slug = params.get('slug');
      if(slug) {
        this.productDetailsService.slug.set(slug)
      }
    })
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
