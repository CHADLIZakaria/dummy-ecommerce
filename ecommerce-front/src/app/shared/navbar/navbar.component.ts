import { Component, effect, inject, OnInit } from '@angular/core';
import { LoginService } from '../../pages/login/services/login.service';
import { RouterLink } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../directives/dropdown.directive';

@Component({
  selector: 'ecom-navbar',
  imports: [RouterLink, CommonModule, DropdownDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loginService = inject(LoginService)
  categoriesResource = inject(NavbarService).categoriesResource
  showCategories = false;
  user = this.loginService.user
  constructor() {
    
  }

  onLogout() {
    this.loginService.logout()
  }


  


}
