import { Component, input, output } from '@angular/core';
import { CategoryWithProduct } from '../../../../pages/home/models/home.model';
import { dropDownAnimation } from '../../../animations/animations';
import { DropdownDirective } from '../../../directives/dropdown.directive';
import { Category } from '../../../model/ecom.model';

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
  categoriesSelected = input.required<Category[]>()
  onLoadMore = output<void>()
  onChangeCategory = output<Category[]>()
  searchCategories = output<string>()

  onSearchCategory(value: string): void {
    this.searchCategories.emit(value)
  }  
  
  onChangeSelectedCategory(category: Category): void {
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
    return this.categoriesSelected().some(category => category.id===idCategory)
  }
  
  resetCategorydSelected(): void {
    this.onChangeCategory.emit([])
  }

  loadMore(): void {
    this.onLoadMore.emit()
  }
}
