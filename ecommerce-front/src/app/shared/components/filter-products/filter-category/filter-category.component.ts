import { Component, inject } from '@angular/core';
import { DropdownDirective } from '../../../directives/dropdown.directive';
import { HomeServices } from '../../../../pages/home/services/home-services.service';
import { CategoryWithProduct } from '../../../../pages/home/models/home.model';
import { LoadingComponent } from '../../loading/loading.component';
import { dropDownAnimation } from '../../../animations/animations';

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
  categoriesSelected: CategoryWithProduct[]= this.homeService.productFilter().categories

  onSearchCategories(value: string): void {
    this.homeService.categoryKeyword.set(value)
  }

  onChangeSelectedCategory(category: CategoryWithProduct): void {
    if(this.categoriesSelected.includes(category)) {
      this.categoriesSelected.splice(this.categoriesSelected.indexOf(category), 1)
    }
    else {
      this.categoriesSelected.push(category)
    }
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(), 
      categories: this.categoriesSelected,
      page: 0
    })
  }

  isCategorySelected(idCategory: number): boolean {
    return this.categoriesSelected.some(category => category.id===idCategory)
  }
  
  resetCategorySelected(): void {
    this.categoriesSelected = []
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(), 
      categories: [],
      page: 0
    })
  }
  
  showMore(): void {
    this.homeService.categoriesWithProductSize.set(this.homeService.categoriesWithProductSize()+10)
  }
}
