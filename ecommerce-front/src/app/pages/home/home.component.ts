import { Component } from '@angular/core';
import { LandingComponent } from "./landing/landing.component";
import { ListCategoriesComponent } from "./list-categories/list-categories.component";
import { ListProductsComponent } from "./list-products/list-products.component";

@Component({
  selector: 'ecom-home',
  imports: [LandingComponent, ListCategoriesComponent, ListProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
