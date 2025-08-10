import { Component, inject } from '@angular/core';
import { HomeServices } from '../../../../pages/home/services/home-services.service';
import { Brand } from '../../../model/ecom.model';
import { DropdownDirective } from '../../../directives/dropdown.directive';
import { LoadingComponent } from '../../loading/loading.component';
import { dropDownAnimation } from '../../../animations/animations';

@Component({
  selector: 'ecom-filter-brand',
  imports: [DropdownDirective, LoadingComponent],
  templateUrl: './filter-brand.component.html',
  styleUrl: './filter-brand.component.scss',
  animations: [dropDownAnimation]
})
export class FilterBrandComponent {
  homeService = inject(HomeServices)
  brands = this.homeService.brandsWithNumberProductsResource
  brandsSelected: Brand[]= this.homeService.productFilter().brands

  onSearchBrands(value: string): void {
    this.homeService.brandKeyword.set(value)
  }  
  
  onChangeSelectedBrand(brand: Brand): void {
    if(this.brandsSelected.includes(brand)) {
      this.brandsSelected.splice(this.brandsSelected.indexOf(brand), 1)
    }
    else {
      this.brandsSelected.push(brand)
    }
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(), 
      brands: this.brandsSelected,
      page: 0
    })
  }
  
  isBrandSelected(idBrand: number): boolean {
    return this.brandsSelected.some(brand => brand.id===idBrand)
  }
  
  resetBrandSelected(): void {
    this.brandsSelected = []
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(), 
      brands: [],
      page: 0
    })
  }

  showMore(): void {
    this.homeService.brandsWithProductSize.set(this.homeService.brandsWithProductSize()+10)
  }

}
