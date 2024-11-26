import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/char.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isUser: boolean = false;
  idUser: any;
  userName: any;
  products: any[] = [];
  categories: any[] = [];
  userCart: any[] = [];
  productUrl: any = 'products';
  responseBox: boolean = false;
  responseMessage: any = ''

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  )
  {
    this.isUser =!!localStorage.getItem('user');

    this.userName = this.authService.getCurrentUser();
    this.idUser = this.authService.getCurrentId();
    
    this.apiService.getAll('products/categories').subscribe({
      next: (categories) => {
        console.log('categories: ', categories);
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error.message);
      }
    })

    this.apiService.getAll('carts/user/' + this.idUser).subscribe({
      next: (usercart) => {
        console.log('usercart: ', usercart);
        this.userCart = usercart;
      },
      error: (error) => {
        console.error('Error fetching categories:', error.message);
      }
    })
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    this.apiService.getAll(this.productUrl).subscribe({
      next: (products) => {
        console.log('productData: ', products);
        this.products = products;
      },
      error: (error) => {
        console.error('Error fetching products:', error.message);
      }
    })
  }

  categorySelected(data:string){
    console.log('Category: ', data);
    if(data){
      this.productUrl = 'products/category/' + data;
    }
    else{
      this.productUrl = 'products';
    }
    this.loadProducts();
  }

  addToCart(product: any) {
    if(this.isUser){
      this.cartService.addToCart(product);
      this.responseBox = true;
      this.responseMessage = 'Product added to cart!';
      setInterval(() => {
        this.responseBox = false;
        this.responseMessage = '';
      }, 1000);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.authService.logout();
  }
}
