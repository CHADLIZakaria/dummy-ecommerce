import { Component, effect, inject } from '@angular/core';
import { slideAnimation } from '../../../../shared/animations/animations';
import { TitleComponent } from "../../../../shared/components/title/title.component";
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { Category } from '../../../../shared/model/ecom.model';
import { HomeServices } from '../../services/home-services.service';

@Component({
  selector: 'ecom-list-categories',
  imports: [TitleComponent],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
  animations: [slideAnimation]
})
export class ListCategoriesComponent {
  currentCategory = 0;
  homeServices = inject(HomeServices)
  categories: Category[] = [];
  isLoading = false;
  rangeLoading = EcomHelper.range(6)

  constructor() {
    effect(() => {
      this.isLoading = true
      this.homeServices.getCategories().subscribe(
        (data) => {
          this.isLoading = false
          this.categories = data.data.data
        }
      )
    })
  }
  updateCarouselCategory(value:'next' | 'prev') {
    if(value==='next') {
      if(this.currentCategory < this.categories.length - 6) {
        this.currentCategory++;
      }
    }
    else {
      if(this.currentCategory > 0) {
        this.currentCategory--
      }
    }
  }
}
