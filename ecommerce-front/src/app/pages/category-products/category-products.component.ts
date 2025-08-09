import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterProductsComponent } from '../../shared/components/filter-products/filter-products.component';
import { LandingComponent } from '../home/components/landing/landing.component';
import { ListProductsComponent } from '../home/components/list-products/list-products.component';
import { CategoryProductsService } from './services/category-products.service';

@Component({
  selector: 'ecom-category-products',
  imports: [LandingComponent, ListProductsComponent, FilterProductsComponent, CommonModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent {
  categoryResource = inject(CategoryProductsService)
  route = inject(ActivatedRoute)
  category = computed(() => this.categoryResource.categoryResource.value().data);
  
  constructor() {
    this.route.paramMap.subscribe(params =>{
      const slug = params.get('slug');
      if(slug) {
        this.categoryResource.slug.set(slug)
      }
    })
  }
}
