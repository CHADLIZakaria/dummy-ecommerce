import { Component, inject, input, output } from '@angular/core';
import { HomeServices } from '../../../../pages/home/services/home-services.service';

@Component({
  selector: 'ecom-filter-keyword',
  imports: [],
  templateUrl: './filter-keyword.component.html',
  styleUrl: './filter-keyword.component.scss'
})
export class FilterKeywordComponent {
  keyword = input.required<string>()
  onChangeKeyword = output<string>()

  onChangeProduct(value: string) {
    this.onChangeKeyword.emit(value)
  }
}
