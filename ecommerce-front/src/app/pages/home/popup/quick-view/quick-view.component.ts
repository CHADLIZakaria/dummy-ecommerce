import { Component, inject, input, OnInit, output } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { QuickViewService } from '../services/quick-view.service';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { UserService } from '../../../../shared/services/user.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CartItem } from '../../models/home.model';
import { ProductDetails } from '../../../../shared/model/ecom.model';

@Component({
  selector: 'ecom-quick-view',
  imports: [NoScrollDirective, CommonModule, LoadingComponent, AlertComponent],
  templateUrl: './quick-view.component.html',
  styleUrl: './quick-view.component.scss'
})
export class QuickViewComponent {
  quickViewService = inject(QuickViewService)
  userService = inject(UserService)
  quickViewDetailsResource = this.quickViewService.quickViewDetailsResource
  currentImage = 0
  numberStar = EcomHelper.range(5)
  alert = {show: false, message: '', type: ''}
  onToggleFavorite = output<{idProduct: number, isFavorite: boolean}>();

  changeCurrentImage(idx: number) {
    this.currentImage = idx;
  }

  toggleFavorite(idProduct: number) {
    this.userService.toggleFavorite(idProduct).subscribe(
      data => {
        if(data.status===200) {
          this.alert = {type: 'favorite', show: true, message: data.data.message}
          this.quickViewDetailsResource.value().data.isFavorite = ! this.quickViewDetailsResource.value().data.isFavorite
          this.onToggleFavorite.emit({ idProduct: idProduct, isFavorite: data.data.isFavorite });
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
