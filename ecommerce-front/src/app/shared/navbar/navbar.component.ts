import { CommonModule } from '@angular/common';
import { Component, computed, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../pages/login/services/login.service';
import { LoadingComponent } from "../components/loading/loading.component";
import { DropdownDirective } from '../directives/dropdown.directive';
import { UserService } from '../services/user.service';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'ecom-navbar',
  imports: [RouterLink, CommonModule, DropdownDirective, LoadingComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('dropdownUser') dropdownUser!: DropdownDirective;  
  loginService = inject(LoginService)
  navbarService = inject(NavbarService)
  categoriesResource = this.navbarService.categoriesResource
  searchProductResource = this.navbarService.searchProductResource
  userService = inject(UserService)
  router = inject(Router)
  cartItems = computed(() => this.userService.cart());
  user = this.loginService.user

  getNumberItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  onLogout() {
    this.dropdownUser.closeDropdown()
    this.loginService.logout()
  }

  removeCartItem(idCartItem: number) {
    this.userService.removeCartItem(idCartItem).subscribe()
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.navbarService.keyword.set(value)

  }
}
