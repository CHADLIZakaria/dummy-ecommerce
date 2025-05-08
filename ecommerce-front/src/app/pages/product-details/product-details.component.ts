import { Component, inject, Pipe } from '@angular/core';
import { LandingComponent } from "../home/landing/landing.component";
import { ProductDetailsService } from './services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe, SlicePipe } from '@angular/common';
import { NumberPipe } from '../../shared/pipes/number.pipe';
import { StarCountPipe } from '../../shared/pipes/star-count.pipe';

@Component({
  selector: 'ecom-product-details',
  imports: [NumberPipe, StarCountPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productDetailsService = inject(ProductDetailsService);
  productDetailsResource = this.productDetailsService.productDetailsResource

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      this.productDetailsService.slug.set(slug)
    }
  }
}
