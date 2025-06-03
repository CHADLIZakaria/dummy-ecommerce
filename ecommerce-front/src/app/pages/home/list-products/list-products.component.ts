import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dropDownAnimation } from '../../../shared/animations/animations';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { Product } from '../../../shared/model/ecom.model';
import { FiltersComponent } from "../filters/filters.component";
import { QuickViewComponent } from '../popup/quick-view/quick-view.component';
import { QuickViewService } from '../popup/services/quick-view.service';
import { HomeServices } from '../services/home-services.service';
import { AlertComponent } from "../../../shared/components/alert/alert.component";
import { CartItem } from '../models/home.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'ecom-list-products',
  imports: [TitleComponent, FiltersComponent, DropdownDirective, RouterLink, QuickViewComponent, CommonModule, AlertComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  animations: [dropDownAnimation]
})
export class ListProductsComponent {
  homeService = inject(HomeServices)
  productsResource = this.homeService.productsResource;
  open = false;
  numberStar = EcomHelper.range(5)
  currentProduct: string = ''
  quickViewService = inject(QuickViewService)
  userService = inject(UserService)
  products = signal<Product[]>([])
  showAlert = false;
  messageAlert = ''

  constructor() {
    effect(() => {
      const newProducts = this.productsResource.value()?.data?.data || [];
      const page = this.homeService.productFilter().page
      if(page === 0) {
        this.products.set(newProducts)
      }
      else {
          this.products.update(prev => [...prev, ...newProducts])
      }
    })
  }
  loadMoreProducts() {
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(),
      page: this.homeService.productFilter().page+1
    })
  }
  onScroll(event: any) {
    const element=event.target;
    if(element.scrollHeight - element.scrollTop <= element.clientHeight +50 && !this.productsResource.isLoading()) {
      this.loadMoreProducts()
    }
  }
  onChangeSort(column: string, direction: string) {
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(),
      sort: column+','+direction,
      page: 0
    })
  }
  toggleFavorite(idProduct: number) {
    this.homeService.toggleFavorite(idProduct).subscribe(
      data => {
        if(data.status===200) {
          this.showAlert = true
          this.messageAlert = data.data.message
          this.products().forEach(product => {
            if(product.id === idProduct) {
              product.favorite = data.data.isFavorite
            }
          })
        }
      }
    )
  }
  onAddToCart(product: Product) {
    const cartItem: CartItem = {
      productImage: product.coverImage,
      productName: product.name,
      price: product.price,
      quantity: 1
    }
    this.userService.addCart(cartItem).subscribe(data => {
      if(data.status===200) {
        this.showAlert = true
        this.messageAlert = data.message

      }
    })
  }
}