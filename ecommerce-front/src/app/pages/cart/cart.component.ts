import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from "../../shared/components/title/title.component";
import { LoginService } from '../login/services/login.service';
import { UserService } from '../../shared/services/user.service';
import { CartItem } from '../home/models/home.model';

@Component({
  selector: 'ecom-cart',
  imports: [TitleComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  userService = inject(UserService)
  cartItems: CartItem[] = []
  isLoading = false;
  ngOnInit(): void {
    this.fetchCart()
  }
  
  fetchCart() {
    this.isLoading = true
    this.userService.getUserCart().subscribe(
      data => {
        this.cartItems = data
        this.isLoading = false
      }
    )
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, cart) => cart.price+acc, 0)
  }
      
}
