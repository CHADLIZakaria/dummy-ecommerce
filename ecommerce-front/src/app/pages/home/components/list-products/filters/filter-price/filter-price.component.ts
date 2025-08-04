import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeServices } from '../../../../services/home-services.service';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'ecom-filter-price',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss'
})
export class FilterPriceComponent {
  homeService = inject(HomeServices);
  formBuilder = inject(FormBuilder);

  formPrice!: FormGroup;

  constructor() {
    effect(() => {
      const range = this.homeService.rangePriceResource.value().data;

      // Wait until real values are loaded
      if (
        range?.minPrice != null &&
        range?.maxPrice != null &&
        range.minPrice !== 0 &&
        range.maxPrice !== 0 &&
        !this.formPrice
      ) {
        this.formPrice = this.formBuilder.group({
          minPrice: [range.minPrice],
          maxPrice: [range.maxPrice]
        });

        this.formPrice.valueChanges.pipe(
            debounceTime(300),
            filter(value => value.minPrice != null && value.maxPrice != null)
          ).subscribe(value => {
          const min = value.minPrice!;
          const max = value.maxPrice!;

          // Enforce a minimum range
          if (min >= max) {
            this.formPrice.patchValue({ minPrice: max - 10 }, { emitEvent: false });
            return;
          }

          if (max - min < 10) {
            this.formPrice.patchValue({ maxPrice: min + 10 }, { emitEvent: false });
            return;
          }

          // Update the filter
          this.homeService.productFilter.set({
            ...this.homeService.productFilter(),
            minPrice: min,
            maxPrice: max
          });
        });
      }
    });
  }
}
