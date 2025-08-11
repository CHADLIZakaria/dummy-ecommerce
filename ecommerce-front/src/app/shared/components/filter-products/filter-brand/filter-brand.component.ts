import { Component, inject, input, output } from '@angular/core';
import { HomeServices } from '../../../../pages/home/services/home-services.service';
import { Brand } from '../../../model/ecom.model';
import { DropdownDirective } from '../../../directives/dropdown.directive';
import { LoadingComponent } from '../../loading/loading.component';
import { dropDownAnimation } from '../../../animations/animations';
import { BrandWithProduct } from '../../../../pages/home/models/home.model';

@Component({
  selector: 'ecom-filter-brand',
  imports: [DropdownDirective, LoadingComponent],
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
    console.log(brand)
    console.log(this.brandsSelected())
    console.log(this.brandsSelected().includes(brand))
    if(this.brandsSelected().includes(brand)) {
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
