import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BrandWithProduct, ProductFilter } from '../../../pages/home/models/home.model';
import { TitleComponent } from '../title/title.component';
import { FilterAvailabilityComponent } from './filter-availability/filter-availability.component';
import { FilterBrandComponent } from './filter-brand/filter-brand.component';
import { FilterCategoryComponent } from './filter-category/filter-category.component';
import { FilterKeywordComponent } from './filter-keyword/filter-keyword.component';
import { FilterPriceComponent } from './filter-price/filter-price.component';
import { Brand } from '../../model/ecom.model';

@Component({
  selector: 'ecom-filter-products',
  imports: [TitleComponent, FilterKeywordComponent, FilterAvailabilityComponent, FilterBrandComponent, FilterCategoryComponent, FilterPriceComponent, CommonModule],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.scss'
})
export class FilterProductsComponent {
  filtersComponent = input.required<string[]>()
  filters = input.required<ProductFilter>()
  brands = input.required<BrandWithProduct[]>()
  totalBrandsElements = input.required<number>()
  brandsSelected = input.required<Brand[]>()

  loadMoreBrands = output<void>()  
  onChangeFilters = output<ProductFilter>()
  searchBrands = output<string>()

  onChangeKeyword(value: string) {
    this.onChangeFilters.emit({
      ...this.filters(),
      keyword: value
    })
  }

  onChangeAvailabilty(value: boolean) {
    this.onChangeFilters.emit({
      ...this.filters(),
      quantity: value ? 1 : null,
    })
  }

  onChangeBrands(brands: Brand[]) {
    this.onChangeFilters.emit({
      ...this.filters(),
      brands,
      page: 0      
    })
  }

  onLoadMoreBrands() {
    this.loadMoreBrands.emit()
  }

  onSearchBrands(value: string) {
    this.searchBrands.emit(value)
  }
}
