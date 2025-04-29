import { Component } from '@angular/core';
import { dropDownAnimation, slideAnimation } from '../../../shared/animations/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'ecom-list-categories',
  imports: [TitleComponent],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
  animations: [slideAnimation]
})
export class ListCategoriesComponent {
  categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  currentCategory = 0;

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
