import { Component, inject, Pipe } from '@angular/core';
import { LandingComponent } from "../home/landing/landing.component";
import { ProductDetailsService } from './services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe, SlicePipe } from '@angular/common';
import { NumberPipe } from '../../shared/pipes/number.pipe';
import { StarCountPipe } from '../../shared/pipes/star-count.pipe';
import { StarPercentagePipe } from '../../shared/pipes/star-percentage.pipe';
import { EcomHelper } from '../../shared/helper/ecomHelper';

@Component({
  selector: 'ecom-product-details',
  imports: [NumberPipe, StarCountPipe, StarPercentagePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productDetailsService = inject(ProductDetailsService);
  productDetailsResource = this.productDetailsService.productDetailsResource
  numberStar = EcomHelper.range(5).reverse()

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      this.productDetailsService.slug.set(slug)
    }
  }
}
