import { Component, inject } from '@angular/core';
import { dropDownAnimation } from '../../../../shared/animations/animations';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { HomeServices } from '../../services/home-services.service';
import { Category } from '../../../../shared/model/ecom.model';

@Component({
  selector: 'ecom-filter-category',
  imports: [DropdownDirective],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.scss',
  animations: [dropDownAnimation]
})
export class FilterCategoryComponent {
  homeService = inject(HomeServices)
  categories = this.homeService.categoriesWithNumberProductResource
  categoriesSelected: Category[]= []

  onSearchCategory(value: string): void {
    this.homeService.categoryKeyword.set(value)
  }  
  onChangeSelectedCategory(category: Category): void {
    if(this.categoriesSelected.includes(category)) {
      this.categoriesSelected.splice(this.categoriesSelected.indexOf(category), 1)
    }
    else {
      this.categoriesSelected.push(category)
    }
    const idsCategory = this.categoriesSelected.map(ele => ele.id).join()
    this.homeService.idsCategory.set(idsCategory);
  }
  getCategorySelected(): string {
    return this.categoriesSelected.map(category => category.title).join(", ")
  }
  isCategorySelected(idCategory: number): boolean {
    return this.categoriesSelected.some(category => category.id===idCategory)
  }

  showMore(): void {
    this.homeService.categoriesWithProductSize.set(this.homeService.categoriesWithProductSize()+10)
  }
}
