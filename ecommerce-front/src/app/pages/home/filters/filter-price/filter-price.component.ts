import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'ecom-filter-price',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss'
})
export class FilterPriceComponent {
  formPrice;
  minPriceControl = new FormControl(0);
  maxPriceControl = new FormControl(1000);
  

  constructor(private formBuilder: FormBuilder) {
    this.formPrice = this.formBuilder.group({
      minPrice: 0,
      maxPrice: 1000
    })
    
    this.minPriceControl.valueChanges.pipe(tap(
      value => console.log("min price "+value)
    )).subscribe()
    this.maxPriceControl.valueChanges.pipe(tap(
      value => console.log("max price"+ value)
    )).subscribe()
    
  }

  onChange(value: any) {
    console.log(value)
  }
}
