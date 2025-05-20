import { Component, computed, inject } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { CommonModule } from '@angular/common';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'ecom-categories',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categoriesService = inject(CategoriesService)

  createPaginateArray(arrLenght: number): number[] {
    return EcomHelper.range(arrLenght)
  }
  onChangePagination(index: number) {
    this.categoriesService.query.set({
      ...this.categoriesService.query(),
      page: index
    })
  }
}
