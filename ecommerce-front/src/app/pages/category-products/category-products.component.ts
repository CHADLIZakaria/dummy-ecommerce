import { Component, computed, inject } from '@angular/core';
import { LandingComponent } from '../home/components/landing/landing.component';
import { ListProductsComponent } from '../home/components/list-products/list-products.component';
import { CategoryProductsService } from './services/category-products.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ecom-category-products',
  imports: [LandingComponent, ListProductsComponent, CommonModule],
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
      console.log(slug)
      if(slug) {
        this.categoryResource.slug.set(slug)
      }
    })
  }
}
