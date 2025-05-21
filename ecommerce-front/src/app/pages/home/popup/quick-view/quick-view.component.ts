import { Component, inject, input } from '@angular/core';
import { NoScrollDirective } from '../../../../shared/directives/no-scroll.directive';
import { QuickViewService } from '../services/quick-view.service';
import { EcomHelper } from '../../../../shared/helper/ecomHelper';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'ecom-quick-view',
  imports: [NoScrollDirective, CommonModule, LoadingComponent],
  templateUrl: './quick-view.component.html',
  styleUrl: './quick-view.component.scss'
})
export class QuickViewComponent {
  quickViewService = inject(QuickViewService)
  productDetailsResource = this.quickViewService.productDetailsReource
  currentImage = 0
  numberStar = EcomHelper.range(5)
  changeCurrentImage(idx: number) {
    this.currentImage = idx;
  }
}
