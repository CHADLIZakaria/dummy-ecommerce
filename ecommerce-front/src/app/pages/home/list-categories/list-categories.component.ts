import { Component, effect, inject, OnInit } from '@angular/core';
import { dropDownAnimation, slideAnimation } from '../../../shared/animations/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { HomeServices } from '../services/home-services.service';
import { Category } from '../../../shared/model/ecom.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'ecom-list-categories',
  imports: [TitleComponent, JsonPipe],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
  animations: [slideAnimation]
})
export class ListCategoriesComponent implements OnInit {
  //categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  currentCategory = 0;
  homeServices = inject(HomeServices)
  categories: Category[] = [];
  isLoading = false;

  constructor() {
    effect(() => {
      this.isLoading = true
      this.homeServices.getCategories().subscribe(
        (data) => {
          this.isLoading = false
          this.categories = data.data.data
          console.log(this.categories)
        }
      )
    })
  }

  ngOnInit(): void {
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
