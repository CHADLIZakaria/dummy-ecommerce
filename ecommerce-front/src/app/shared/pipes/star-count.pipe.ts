import { Pipe, PipeTransform } from '@angular/core';
import { Review } from '../model/ecom.model';

@Pipe({
  name: 'starCount'
})
export class StarCountPipe implements PipeTransform {

  transform(reviews: Review[], starCount: number): number {
    return reviews.filter(review => review.rating===starCount).length
  }

}
