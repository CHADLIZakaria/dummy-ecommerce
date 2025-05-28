import { Component, inject, OnInit } from '@angular/core';
import { FavoriteUserProductsService } from './services/favorite-user-products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/model/ecom.model';
import { RouterLink } from '@angular/router';
import { DropdownDirective } from '../../shared/directives/dropdown.directive';
import { TitleComponent } from '../../shared/components/title/title.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'ecom-favorite-user-products',
  imports: [CommonModule, RouterLink, DropdownDirective, TitleComponent, AlertComponent],
  templateUrl: './favorite-user-products.component.html',
  styleUrl: './favorite-user-products.component.scss'
})
export class FavoriteUserProductsComponent implements OnInit {
  favoriteUserProductsService = inject(FavoriteUserProductsService)
  products: Product[] = []
  showAlert = false
  messageAlert = ""
  ngOnInit(): void {
    this.fetchFavoritesProduct()
  }
  fetchFavoritesProduct(column: string="id", direction: string="desc") {
    this.favoriteUserProductsService.getFavoritesProducts(column, direction).subscribe(
      data => {
        this.products = data.data
      }
    )
  }
  toggleFavorite(idProduct: number) {
    this.favoriteUserProductsService.toggleFavorite(idProduct).subscribe(
      data => {
        if(data.status===200) {
          this.showAlert = true
          this.messageAlert = data.data.message
          this.products = this.products.filter(product => product.id!==idProduct)
        }
      }
    )
  }
  onCloseAlert() {
    this.showAlert = false
  }
  onChangeSort(column: string, direction: string) {
    this.fetchFavoritesProduct(column, direction)
  }
}
