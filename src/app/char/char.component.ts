import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/char.service';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-char',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink, DatePipe],
  templateUrl: './char.component.html',
  styleUrl: './char.component.scss'
})
export class CharComponent implements OnInit {
  isUser: boolean = false;
  idUser: any;
  userName: any;

  userCart: any[] = [];

  cartItems: any = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.isUser =!!localStorage.getItem('user');

    this.userName = this.authService.getCurrentUser();
    this.idUser = this.authService.getCurrentId();
  }

  ngOnInit(): void {
    // this.cartItems = this.cartService.getCart();
    // this.calculateTotal();
    this.loadCart();
  }

  async loadCart(): Promise<void> {
    this.cartService.getCart().subscribe({
      next: (cartItems) => {
        console.log('cartItems: ', cartItems);
        this.cartItems = cartItems;
        // this.calculateTotal();
      },
      error: (error) => {
        console.error('Error fetching cart items:', error.message);
      }
    });
    // this.apiService.getAll('carts/user/' + this.idUser).subscribe({
    //   next: (usercart) => {
    //     console.log('usercart: ', usercart);
    //     this.userCart = usercart;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching categories:', error.message);
    //   }
    // })
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
    // this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartService.getTotal();
  }

  logout() {
    this.authService.logout();
  }
}
