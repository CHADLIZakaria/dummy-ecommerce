import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ecom-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  links = [
    {
      link: '',
      name: 'Dashboard',
      icon: 'fa-chart-pie'
    },
    {
      link: '',
      name: 'Categories',
      icon: 'fa-layer-group'
    },
    {
      link: '',
      name: 'Products',
      icon: 'fa-bag-shopping'
    },
    {
      link: '',
      name: 'Users',
      icon: 'fa-user-group'
    },
    {
      link: '',
      name: 'Reviews',
      icon: 'fa-comments'
    }
  ]
}
