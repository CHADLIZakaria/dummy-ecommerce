import { Component, computed, effect, inject, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../pages/login/services/login.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../directives/dropdown.directive';
import { UserService } from '../services/user.service';
import { CartItem } from '../../pages/home/models/home.model';

@Component({
  selector: 'ecom-navbar',
  imports: [RouterLink, CommonModule, DropdownDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('dropdownUser') dropdownUser!: DropdownDirective;  
  loginService = inject(LoginService)
  categoriesResource = inject(NavbarService).categoriesResource
  userService = inject(UserService)
  router = inject(Router)
  showCategories = false;
  cartItems = computed(() => this.userService.cart());
  user = this.loginService.user
  getNumberItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  onLogout() {
    this.dropdownUser.closeDropdown()
    this.loginService.logout()
  }

  onNavigate(link: string) {
    this.dropdownUser.closeDropdown()
    this.router.navigate([link])
  }

}
