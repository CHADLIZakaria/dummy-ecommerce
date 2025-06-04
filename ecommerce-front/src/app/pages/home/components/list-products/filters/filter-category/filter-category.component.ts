import { Component, inject } from '@angular/core';
import { DropdownDirective } from '../../../../../../shared/directives/dropdown.directive';
import { LoadingComponent } from '../../../../../../shared/components/loading/loading.component';
import { dropDownAnimation } from '../../../../../../shared/animations/animations';
import { HomeServices } from '../../../../services/home-services.service';
import { Category } from '../../../../../../shared/model/ecom.model';


@Component({
  selector: 'ecom-filter-category',
  imports: [DropdownDirective, LoadingComponent],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.scss',
  animations: [dropDownAnimation]
})
export class FilterCategoryComponent {
  homeService = inject(HomeServices)
  categories = this.homeService.categoriesWithNumberProductResource
  categoriesSelected: Category[]= []

  onSearchCategories(value: string): void {
    this.homeService.brandKeyword.set(value)
  }  
  onChangeSelectedCategory(brand: Category): void {
    if(this.categoriesSelected.includes(brand)) {
      this.categoriesSelected.splice(this.categoriesSelected.indexOf(brand), 1)
    }
    else {
      this.categoriesSelected.push(brand)
    }
    const idsCategory = this.categoriesSelected.map(ele => ele.id).join()
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(), 
      idsCategory: idsCategory
    })
  }
  isCategorySelected(idCategory: number): boolean {
    return this.categoriesSelected.some(category => category.id===idCategory)
  }
  resetCategorySelected(): void {
    this.categoriesSelected = []
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(), 
      idsCategory: ''
    })
  }
  showMore(): void {
    this.homeService.categoriesWithProductSize.set(this.homeService.categoriesWithProductSize()+10)
  }
}
