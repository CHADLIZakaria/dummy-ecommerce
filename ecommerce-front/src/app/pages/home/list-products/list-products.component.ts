import { Component, inject } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FiltersComponent } from "../filters/filters.component";
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { dropDownAnimation } from '../../../shared/animations/animations';
import { HomeServices } from '../services/home-services.service';

@Component({
  selector: 'ecom-list-products',
  imports: [TitleComponent, FiltersComponent, DropdownDirective],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  animations: [dropDownAnimation]
})
export class ListProductsComponent {
  homeService = inject(HomeServices)
  productsResource = this.homeService.productsResource;
  open = false;
}
