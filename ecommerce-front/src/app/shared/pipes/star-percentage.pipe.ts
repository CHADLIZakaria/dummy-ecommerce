import { Pipe, PipeTransform } from '@angular/core';
import { Review } from '../model/ecom.model';

@Pipe({
  name: 'starPercentage'
})
export class StarPercentagePipe implements PipeTransform {

  transform(reviews: Review[], starCount: number): unknown {
    const reviewsFilter = reviews.filter(review => review.rating===starCount)
    return reviewsFilter.length/reviews.length * 100
  }

}
