import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ecom-filter-price',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss'
})
export class FilterPriceComponent {
  formPrice;
  minPrice = 0;
  maxPrice = 1000
  isValidPrice = false;
  
  constructor(private formBuilder: FormBuilder) {
    this.formPrice = this.formBuilder.group({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    })
    
    this.formPrice.valueChanges.subscribe(value => {
      if(value.minPrice! >= value.maxPrice!) {
        this.formPrice.patchValue({
          maxPrice: value.minPrice!+10         
        })
      }
    })
  }

  onChange(value: any) {
  }
}
