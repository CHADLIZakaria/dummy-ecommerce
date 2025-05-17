import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'ecom-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  size = input<'lg' | 'md' | 'sm' | 'xs'>('lg');
  sizeClassMap = {
    xs: 'w-10 h-10',
    sm: 'w-20 h-20',
    md: 'w-36 h-36',
    lg: 'w-48 h-48'    
  }
}
