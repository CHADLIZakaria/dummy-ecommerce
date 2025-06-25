import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { DropdownDirective } from '../../shared/directives/dropdown.directive';
import { Product } from '../../shared/model/ecom.model';
import { UserService } from '../../shared/services/user.service';
import { CartItem } from '../home/models/home.model';
import { HomeServices } from '../home/services/home-services.service';
import { FavoriteUserProductsService } from './services/favorite-user-products.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'ecom-favorite-user-products',
  imports: [CommonModule, RouterLink, DropdownDirective, TitleComponent, AlertComponent, LoadingComponent],
  templateUrl: './favorite-user-products.component.html',
  styleUrl: './favorite-user-products.component.scss'
})
export class FavoriteUserProductsComponent implements OnInit {
  favoriteUserProductsService = inject(FavoriteUserProductsService)
  userService = inject(UserService)
  homeService = inject(HomeServices)
  products: Product[] = []
  alert = {show: false, message: '', type: ''};
  isLoading = false

  ngOnInit(): void {
    this.fetchFavoritesProduct()
  }

  fetchFavoritesProduct(column: string="id", direction: string="desc") {
    this.isLoading = true
    this.favoriteUserProductsService.getFavoritesProducts(column, direction).subscribe(
      data => {
        this.isLoading = false
        this.products = data.data
      }
    )
  }

  toggleFavorite(idProduct: number) {
    this.userService.toggleFavorite(idProduct).subscribe(
      data => {
        if(data.status===200) {
          this.alert = {show: true, message: data.data.message, type: 'favorite'}
          this.products = this.products.filter(product => product.id!==idProduct)
        }
      }
    )
  }

  onChangeSort(column: string, direction: string) {
    this.fetchFavoritesProduct(column, direction)
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
        this.alert = {type: 'cart', show: true, message: data.message}
      }
    })
  }
}
