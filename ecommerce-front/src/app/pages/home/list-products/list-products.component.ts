import { Component, computed, effect, inject, signal } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FiltersComponent } from "../filters/filters.component";
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { dropDownAnimation } from '../../../shared/animations/animations';
import { HomeServices } from '../services/home-services.service';
import { RouterLink } from '@angular/router';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { NumberPipe } from '../../../shared/pipes/number.pipe';
import { QuickViewComponent } from '../popup/quick-view/quick-view.component';
import { QuickViewService } from '../popup/services/quick-view.service';
import { Product } from '../../../shared/model/ecom.model';

@Component({
  selector: 'ecom-list-products',
  imports: [TitleComponent, FiltersComponent, DropdownDirective, RouterLink, NumberPipe, QuickViewComponent],
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
  products = signal<Product[]>([])

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
}