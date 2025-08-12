import { Component, input, output } from '@angular/core';
import { BrandWithProduct } from '../../../../pages/home/models/home.model';
import { dropDownAnimation } from '../../../animations/animations';
import { DropdownDirective } from '../../../directives/dropdown.directive';
import { Brand } from '../../../model/ecom.model';

@Component({
  selector: 'ecom-filter-brand',
  imports: [DropdownDirective],
  templateUrl: './filter-brand.component.html',
  styleUrl: './filter-brand.component.scss',
  animations: [dropDownAnimation]
})
export class FilterBrandComponent {
  brands = input.required<BrandWithProduct[]>()
  totalBrandsElements = input.required<number>()  
  brandsSelected= input.required<Brand[]>()
  onLoadMore = output<void>()
  onChangeBrands = output<Brand[]>()
  searchBrands = output<string>()

  onSearchBrands(value: string): void {
    this.searchBrands.emit(value)
  }  
  
  onChangeSelectedBrand(brand: Brand): void {
    if(this.brandsSelected().map(brand => brand.id).includes(brand.id)) {
      this.brandsSelected().splice(this.brandsSelected().indexOf(brand), 1)
    }
    else {
      this.brandsSelected().push(brand)
    }
    this.onChangeBrands.emit(this.brandsSelected())
  }
  
  isBrandSelected(idBrand: number): boolean {
    return this.brandsSelected().some(brand => brand.id===idBrand)
  }
  
  resetBrandSelected(): void {
    this.onChangeBrands.emit([])
  }

  loadMore(): void {
    this.onLoadMore.emit()
  }
}
