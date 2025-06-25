import { Component, computed, inject, OnInit } from '@angular/core';
import { TitleComponent } from "../../shared/components/title/title.component";
import { UserService } from '../../shared/services/user.service';
import { CartItem } from '../home/models/home.model';
import { CommonModule } from '@angular/common';
import { TimedAlertComponent } from "../../shared/components/timed-alert/timed-alert.component";

@Component({
  selector: 'ecom-cart',
  imports: [TitleComponent, CommonModule, TimedAlertComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  userService = inject(UserService)
  cartItems = computed(() => this.userService.cart());
  isLoading = false;


  getTotalPrice() {
    return this.cartItems().reduce((acc, cart) => (cart.price * cart.quantity)+acc, 0)
  }

  getTotalItems() {
    return this.cartItems().reduce((acc, cart) => cart.quantity+acc, 0)
  }
  
  onChangeQuantity(cartItem: CartItem, operation: '+' | '-') {
    cartItem = {...cartItem, quantity: operation==='+' ? cartItem.quantity+1 : cartItem.quantity-1}
    this.userService.updateQuantity(cartItem).subscribe(data => {
      if(data.status===200) {

      }
    })
  }

  removeCartItem(idItem: number) {
    this.userService.removeCartItem(idItem).subscribe()
  }
}
