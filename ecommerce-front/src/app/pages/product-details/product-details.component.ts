import { Component, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EcomHelper } from '../../shared/helper/ecomHelper';
import { ImageService } from '../../shared/services/image.service';
import { ReviewsComponent } from "./reviews/reviews.component";
import { ProductDetailsService } from './services/product-details.service';
import { NumberPipe } from '../../shared/pipes/number.pipe';

@Component({
  selector: 'ecom-product-details',
  imports: [ReviewsComponent, NumberPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productDetailsService = inject(ProductDetailsService);
  productDetailsResource = this.productDetailsService.productDetailsResource
  numberStar = EcomHelper.range(5)
  imageService = inject(ImageService)

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      this.productDetailsService.slug.set(slug)
    }
  }
}
