import { Component } from '@angular/core';
import { LandingComponent } from "./components/landing/landing.component";
import { ListCategoriesComponent } from "./components/list-categories/list-categories.component";
import { ListProductsComponent } from './components/list-products/list-products.component';

@Component({
  selector: 'ecom-home',
  imports: [LandingComponent, ListCategoriesComponent, ListProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
