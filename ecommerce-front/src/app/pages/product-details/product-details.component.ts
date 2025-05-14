import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomHelper } from '../../shared/helper/ecomHelper';
import { ImageService } from '../../shared/services/image.service';
import { ReviewsComponent } from "./reviews/reviews.component";
import { ProductDetailsService } from './services/product-details.service';

@Component({
  selector: 'ecom-product-details',
  imports: [ReviewsComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productDetailsService = inject(ProductDetailsService);
  productDetailsResource = this.productDetailsService.productDetailsResource
  numberStar = EcomHelper.range(5)
  imageService = inject(ImageService)
  currentImage: number = 0

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      this.productDetailsService.slug.set(slug)
    }
  }
  changeCurrentImage(index: number) {
    this.currentImage = index
  }
}
