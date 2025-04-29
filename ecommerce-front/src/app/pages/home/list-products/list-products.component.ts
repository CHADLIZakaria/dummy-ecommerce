import { Component } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FiltersComponent } from "../filters/filters.component";
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { dropDownAnimation } from '../../../shared/animations/animations';

@Component({
  selector: 'ecom-list-products',
  imports: [TitleComponent, FiltersComponent, DropdownDirective],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  animations: [dropDownAnimation]
})
export class ListProductsComponent {

}
