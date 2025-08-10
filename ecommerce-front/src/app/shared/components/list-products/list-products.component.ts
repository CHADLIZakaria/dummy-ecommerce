import { Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { EcomHelper } from '../../helper/ecomHelper';
import { HomeServices } from '../../../pages/home/services/home-services.service';
import { QuickViewService } from '../../../pages/home/popup/services/quick-view.service';
import { UserService } from '../../services/user.service';
import { Product } from '../../model/ecom.model';
import { CartItem } from '../../../pages/home/models/home.model';
import { TitleComponent } from '../title/title.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { QuickViewComponent } from '../../../pages/home/popup/quick-view/quick-view.component';

@Component({
  selector: 'ecom-list-products',
  imports: [TitleComponent, DropdownDirective, CommonModule, RouterLink, AlertComponent, QuickViewComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  products = input.required<Product[]>()
  totalElements = input.required<number>()
  isLoading = input.required<boolean>()
  numberStar = EcomHelper.range(5)
  quickViewService = inject(QuickViewService)
  
  alert = {show: false, message: '', type: ''}
  open = false;
  currentProduct: string = ''
  isGrid = true;
  @ViewChild('dropdownSortReview') dropdownSortReview!: DropdownDirective;
  sortColumn: 'name' | 'price' | 'avgReview' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {
  }



}
