import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { slideAnimation } from '../../../../shared/animations/animations';
import { TitleComponent } from "../../../../shared/components/title/title.component";
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { HomeServices } from '../../services/home-services.service';

@Component({
  selector: 'ecom-list-categories',
  imports: [TitleComponent, RouterModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
  animations: [slideAnimation]
})
export class ListCategoriesComponent {
  currentCategory = 0;
  homeServices = inject(HomeServices)
  categories = computed(() => this.homeServices.categoriesResource.value().data.data);
  rangeLoading = EcomHelper.range(6)

  updateCarouselCategory(value:'next' | 'prev') {
    if(value==='next') {
      if(this.currentCategory < this.categories().length - 6) {
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
