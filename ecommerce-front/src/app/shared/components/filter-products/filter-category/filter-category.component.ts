import { Component, input, output } from '@angular/core';
import { CategoryWithProduct } from '../../../../pages/home/models/home.model';
import { dropDownAnimation } from '../../../animations/animations';
import { DropdownDirective } from '../../../directives/dropdown.directive';

@Component({
  selector: 'ecom-filter-category',
  imports: [DropdownDirective],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.scss',
  animations: [dropDownAnimation]
})
export class FilterCategoryComponent {
  categories = input.required<CategoryWithProduct[]>()
  totalCategoriesElements = input.required<number>()  
  categoriesSelected = input.required<CategoryWithProduct[]>()
  onLoadMore = output<void>()
  onChangeCategory = output<CategoryWithProduct[]>()
  searchCategories = output<string>()

  onSearchCategory(value: string): void {
    this.searchCategories.emit(value)
  }  
  
  onChangeSelectedCategory(category: CategoryWithProduct): void {
    const selected = [...this.categoriesSelected()];
    const index = selected.findIndex(element => element.id === category.id);

    if (index !== -1) {
      selected.splice(index, 1);
    } else {
      selected.push(category);
    }

    this.onChangeCategory.emit(selected);
  }
  
  isCategorySelected(idCategory: number): boolean {
    return this.categoriesSelected().some(brand => brand.id===idCategory)
  }
  
  resetCategorydSelected(): void {
    this.onChangeCategory.emit([])
  }

  loadMore(): void {
    this.onLoadMore.emit()
  }
}
