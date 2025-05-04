import { Component, inject } from '@angular/core';
import { dropDownAnimation } from '../../../../shared/animations/animations';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { HomeServices } from '../../services/home-services.service';
import { Brand } from '../../../../shared/model/ecom.model';

@Component({
  selector: 'ecom-filter-brand',
  imports: [DropdownDirective],
  templateUrl: './filter-brand.component.html',
  styleUrl: './filter-brand.component.scss',
  animations: [dropDownAnimation]
})
export class FilterBrandComponent {
  homeService = inject(HomeServices)
  brands = this.homeService.brandsWithNumberProductsResource
  brandsSelected: Brand[]= []

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
    const idsBrand = this.brandsSelected.map(ele => ele.id).join()
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(), 
      idsBrand: idsBrand
    })
  }
  getBrandsSelected(): string {
    return this.brandsSelected.map(brand => brand.name).join(", ")
  }
  isBrandSelected(idBrand: number): boolean {
    return this.brandsSelected.some(brand => brand.id===idBrand)
  }
  showMore(): void {
    //this.homeService.brandsWithNumberProductsResource.set(this.homeService.brandsWithNumberProductsResource()+10)
  }
}
