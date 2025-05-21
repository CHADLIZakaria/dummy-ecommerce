import { Component, inject } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FiltersComponent } from "../filters/filters.component";
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { dropDownAnimation } from '../../../shared/animations/animations';
import { HomeServices } from '../services/home-services.service';
import { RouterLink } from '@angular/router';
import { EcomHelper } from '../../../shared/helper/ecomHelper';
import { NumberPipe } from '../../../shared/pipes/number.pipe';
import { QuickViewComponent } from '../popup/quick-view/quick-view.component';
import { QuickViewService } from '../popup/services/quick-view.service';

@Component({
  selector: 'ecom-list-products',
  imports: [TitleComponent, FiltersComponent, DropdownDirective, RouterLink, NumberPipe, QuickViewComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  animations: [dropDownAnimation]
})
export class ListProductsComponent {
  homeService = inject(HomeServices)
  productsResource = this.homeService.productsResource;
  open = false;
  numberStar = EcomHelper.range(5)
  currentProduct: string = ''
  quickViewService = inject(QuickViewService)

  showMoreProducts() {
    this.homeService.productFilter.set({
      ...this.homeService.productFilter(),
      size: this.homeService.productFilter().size+10
    })
  }
}
