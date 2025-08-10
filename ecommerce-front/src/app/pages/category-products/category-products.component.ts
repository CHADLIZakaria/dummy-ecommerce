import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterProductsComponent } from '../../shared/components/filter-products/filter-products.component';
import { LandingComponent } from '../home/components/landing/landing.component';
import { CategoryProductsService } from './services/category-products.service';
import { ListProductsComponent } from '../../shared/components/list-products/list-products.component';

@Component({
  selector: 'ecom-category-products',
  imports: [LandingComponent, ListProductsComponent, FilterProductsComponent, CommonModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent {
  categoryService = inject(CategoryProductsService)
  route = inject(ActivatedRoute)
  category = computed(() => this.categoryService.categoryResource.value().data);
  products = computed(() =>  this.categoryService.productsResource.value().data.data);
  isLoading =  computed(() =>  this.categoryService.productsResource.isLoading());
  totalElements =  computed(() =>  this.categoryService.productsResource.value().data.totalElements);
  
  
  constructor() {
    this.route.paramMap.subscribe(params =>{
      const slug = params.get('slug');
      if(slug) {
        this.categoryService.slug.set(slug)
      }
    })
  }
}
