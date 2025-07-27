import { Component, computed, inject } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { Product } from '../../../../shared/model/ecom.model';
import { CompareProductsService } from '../../services/compare-products.service';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'ecom-search-products',
  imports: [NoScrollDirective, CommonModule],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss'
})
export class SearchProductsComponent {
  compareProductsService = inject(CompareProductsService)
  loginService = inject(LoginService)
  compareProductsResource = this.compareProductsService.searchProductResource
  products = computed(() =>  this.compareProductsResource.value().data.data)
  productsPagiation = computed(() => EcomHelper.range(Math.ceil(this.compareProductsResource.value().data.totalElements/this.compareProductsResource.value().data.size)))


  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const keyword = input.value;
    this.compareProductsService.search.set({
      ...this.compareProductsService.search(),
      page: 0,
      keyword
    })
  }

  onChangePage(page: number) {
    this.compareProductsService.search.set({
      ...this.compareProductsService.search(),
      page
    })
  }

  onAddProduct(productSlug: string) {
    const username = this.loginService.user()?.username!
    this.compareProductsService.addProduct(username, productSlug).subscribe()
  }

  onClose() {
    this.compareProductsService.showSearchPopup.set(false)
  }

}
