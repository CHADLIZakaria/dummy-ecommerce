import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { LoginService } from '../login/services/login.service';
import { SearchProductsComponent } from "./popup/search-products/search-products.component";
import { CompareProductsService } from './services/compare-products.service';

@Component({
  selector: 'ecom-compare-products',
  imports: [SearchProductsComponent, CommonModule],
  templateUrl: './compare-products.component.html',
  styleUrl: './compare-products.component.scss'
})
export class CompareProductsComponent  {
  compareProductsService = inject(CompareProductsService)
  loginService = inject(LoginService)
  products = computed(()=> this.compareProductsService.compareProducts())
  
  constructor() {
    effect(() => {
      const user = this.loginService.user();
      if (user?.username) {
        this.compareProductsService.getProducts(user.username).subscribe();
      }
    });
  }

  onDelete(productSlug: string) {
    const user = this.loginService.user();
    this.compareProductsService.removeCompareProduct(user?.username!, productSlug).subscribe()
  }
}
