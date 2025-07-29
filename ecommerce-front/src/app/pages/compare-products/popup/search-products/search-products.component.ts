import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { LoginService } from '../../../login/services/login.service';
import { CompareProductsService } from '../../services/compare-products.service';

@Component({
  selector: 'ecom-search-products',
  imports: [NoScrollDirective, CommonModule],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss'
})
export class SearchProductsComponent {
  compareProductsService = inject(CompareProductsService)
  loginService = inject(LoginService)
  searchProductResource = this.compareProductsService.searchProductResource
  products = computed(() =>  this.searchProductResource.value().data.data)
  productsPagination = computed(() => EcomHelper.range(Math.ceil(this.searchProductResource.value().data.totalElements/this.searchProductResource.value().data.size)))


  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const keyword = input.value;
    this.compareProductsService.search.set({
      ...this.compareProductsService.search(),
      page: 0,
      keyword
    })
  }

  prev() {
    const current = this.compareProductsService.search();
    if (current.page > 0) {
      this.compareProductsService.search.set({
        ...current,
        page: current.page - 1
      });
    }
  }

  next() {
    const current = this.compareProductsService.search();
    const totalPages = Math.ceil(this.searchProductResource.value().data.totalElements/this.searchProductResource.value().data.size);
    if (current.page < totalPages - 1) {
      this.compareProductsService.search.set({
        ...current,
        page: current.page + 1
      });
    }
  }

  first() {
     this.compareProductsService.search.set({
        ...this.compareProductsService.search(),
        page: 0
      });
  }

  last() {
    const lastPage = Math.ceil(this.searchProductResource.value().data.totalElements/this.searchProductResource.value().data.size)-1;
    this.compareProductsService.search.set({
      ...this.compareProductsService.search(),
      page: lastPage
    });
  }

  onChangePage(page: number) {
    this.compareProductsService.search.set({
      ...this.compareProductsService.search(),
      page
    })
  }

  onAddProduct(productSlug: string) {
    const username = this.loginService.user()?.username!
    this.compareProductsService.addProduct(username, productSlug).subscribe(data => {
      this.onClose()
    })
  }

  onClose() {
    this.compareProductsService.showSearchPopup.set(false)
  }


  isProductCompare(productSlug: string): boolean {
    return this.compareProductsService.compareProducts().map(product => product.slug).includes(productSlug)
  }
}
