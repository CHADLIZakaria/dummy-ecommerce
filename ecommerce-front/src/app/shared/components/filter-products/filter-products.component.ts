import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BrandWithProduct, CategoryWithProduct, ProductFilter } from '../../../pages/home/models/home.model';
import { Brand } from '../../model/ecom.model';
import { TitleComponent } from '../title/title.component';
import { FilterAvailabilityComponent } from './filter-availability/filter-availability.component';
import { FilterBrandComponent } from './filter-brand/filter-brand.component';
import { FilterCategoryComponent } from './filter-category/filter-category.component';
import { FilterKeywordComponent } from './filter-keyword/filter-keyword.component';
import { FilterPriceComponent } from './filter-price/filter-price.component';

@Component({
  selector: 'ecom-filter-products',
  imports: [
    TitleComponent, CommonModule,
    FilterKeywordComponent, FilterAvailabilityComponent, FilterBrandComponent,
    FilterCategoryComponent, FilterPriceComponent,
  ],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.scss'
})
export class FilterProductsComponent {
  filtersComponent = input.required<string[]>()
  filters = input.required<ProductFilter>()
  brands = input<BrandWithProduct[]>()
  totalBrandsElements = input<number>()
  brandsSelected = input<Brand[]>()
  loadMoreBrands = output<void>()
  searchBrands = output<string>()

  categories = input<CategoryWithProduct[]>()
  totalCategoriesElements = input<number>()
  categoriesSelected = input<CategoryWithProduct[]>()
  loadMoreCategories = output<void>()
  searchCategories = output<string>()
  onChangeFilters = output<ProductFilter>()

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

  onChangeCategories(categories: CategoryWithProduct[]) {
    this.onChangeFilters.emit({
      ...this.filters(),
      categories,
      page: 0
    })
  }

  onLoadMoreCategories() {
    this.loadMoreCategories.emit()
  }

  onSearchCategories(value: string) {
    this.searchCategories.emit(value)
  }
}
