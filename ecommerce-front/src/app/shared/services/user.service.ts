import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CartItem } from '../../pages/home/models/home.model';
import { EcomResponse, FavoriteRespone } from '../model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private cartSignal = signal<CartItem[]>([]);
  readonly cart = this.cartSignal.asReadonly();
  readonly cartCount = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));

  constructor() {
    this.loadCart();
  }

  loadCart(): void {
    this.http.get<CartItem[]>(`${environment.baseUrl}cart`).subscribe(cart => this.cartSignal.set(cart));
  }

  addCart(cartItem: CartItem): Observable<EcomResponse<CartItem>> {
    return this.http.post<EcomResponse<CartItem>>(`${environment.baseUrl}cart/add`, cartItem)
      .pipe(tap(
        response => {
          if(response.status===200) {
            this.updateCarts(response.data)
          }
        }
      ));
  }

  updateQuantity(cartItem: CartItem): Observable<EcomResponse<CartItem>> {
    return this.http.put<EcomResponse<CartItem>>(`${environment.baseUrl}cart/item/${cartItem.id}/${cartItem.quantity}`, {})
      .pipe(tap(
        response => {
          if(response.status===200) {
            this.updateCarts(response.data)
          }
        }
      ));
  }

  removeCartItem(itemId: number): Observable<EcomResponse<void>> {
    return this.http.delete<EcomResponse<void>>(`${environment.baseUrl}cart/remove/${itemId}`)
    .pipe(tap(
      response => {
        if(response.status===200) {
          const newCart = this.cartSignal().filter(cartItem => cartItem.id !== itemId)
          this.cartSignal.set(newCart)
        }
      }
    ));
  }

  updateCarts(cartItem: CartItem) {
    const currentCart = this.cartSignal();
    const existingIndex = currentCart.findIndex(item => item.id === cartItem.id);
    let updatedCart: CartItem[];
    if (existingIndex !== -1) {
      updatedCart = currentCart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: cartItem.quantity }
          : item
      );
    }
    else {
      updatedCart = [...currentCart, cartItem];
    }
    this.cartSignal.set(updatedCart);
  }

  toggleFavorite(idProduct: number): Observable<EcomResponse<FavoriteRespone>> {
    return this.http.post<EcomResponse<FavoriteRespone>>(`${environment.baseUrl}products/toggle/favorites/${idProduct}`, {}).pipe(
      tap(
        data => {
          if(data.status===200) {
            console.log(data)
          }
        }
      )
    )
  }
}
