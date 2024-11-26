import { Component } from '@angular/core';
import { CartService } from '../services/char.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems: any = [];
  totalPrice: number = 0;

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotal();
  }

  submitOrder() {
    alert('Order placed successfully!');
    this.cartService.clearCart();
  }
}
