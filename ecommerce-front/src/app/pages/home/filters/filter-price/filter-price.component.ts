import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomeServices } from '../../services/home-services.service';

@Component({
  selector: 'ecom-filter-price',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss'
})
export class FilterPriceComponent {
  formPrice;
  homeService = inject(HomeServices);
  minPrice = computed(() => this.homeService.rangePriceResource.value().data.minPrice);
  maxPrice =  computed(() => this.homeService.rangePriceResource.value().data.maxPrice)
  
  constructor(private formBuilder: FormBuilder) {
    this.formPrice = this.formBuilder.group({
      minPrice: this.minPrice(),
      maxPrice: this.maxPrice()
    })    
    this.formPrice.valueChanges.subscribe(value => {
      if(value.minPrice! >= value.maxPrice!) {
        this.formPrice.patchValue({
          minPrice: value.minPrice!-10
        })
      }
      else if(value.maxPrice! - value.minPrice! <= 10) {
        this.formPrice.patchValue({
          minPrice: value.minPrice!,
          maxPrice: value.minPrice!+10
        })
      }      
      this.homeService.productFilter.set({
        ...this.homeService.productFilter(), 
        minPrice: value.minPrice!, 
        maxPrice: value.maxPrice!
      })
    })
  }
}
