import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { SearchProductsComponent } from "./popup/search-products/search-products.component";
import { CompareProductsService } from './services/compare-products.service';
import { LoginService } from '../login/services/login.service';
import { Product } from '../../shared/model/ecom.model';
import { CommonModule } from '@angular/common';
import { CompareProduct } from './compare-products.model';

@Component({
  selector: 'ecom-compare-products',
  imports: [SearchProductsComponent, CommonModule],
  templateUrl: './compare-products.component.html',
  styleUrl: './compare-products.component.scss'
})
export class CompareProductsComponent  {
  compareProductsService = inject(CompareProductsService)
  loginService = inject(LoginService)
  products: CompareProduct[] = []
  
  constructor() {
    effect(() => {
      const user = this.loginService.user();
      if (user?.username) {
        console.log('Username:', user.username);
        this.compareProductsService.getProducts(user.username).subscribe(
          data => {
            this.products = data
          }
        );
      }
    });
  }

}
