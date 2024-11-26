import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];
  userId: any;
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getCurrentId();
  }

  // Mendapatkan produk di keranjang
  getCart() {
    return this.apiService.getAll('carts/user/' + this.userId);
  }

  // Menambahkan produk ke keranjang
  addToCart(product: any) {
    const newData = {
      userId: this.userId,
      date: new Date().toISOString().split('T')[0],
      products: [
        { productId: product.id, quantity: 1 }
      ]
    }
    this.apiService.postData('carts', JSON.stringify(newData)).subscribe({
      next: (response) => console.log('Product added to cart:', response),
      error: (err) => console.error('Error adding product to cart:', err),
    })

    // this.apiService.getId('carts/user', 1).subscribe({
    //   next: (cart:any) => {
    //     const existingProduct = cart.find((p: any) => p.productId === product.id);
    //     console.log('existingProduct: ', existingProduct);
    //     if (existingProduct) {
    //       existingProduct.quantity += 1;
    //       console.log('Updated Product in Cart:', existingProduct);
    //     } else {
    //       const newCartItem = { productId: product.id, quantity: 1 };
    //       this.cart.push(newCartItem);
    //       console.log('New Product Added:', newCartItem);
    //     }
    //     this.syncCartToBackend(this.cart);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching cart:', error.message);
    //   }
    // })
  }

  syncCartToBackend(updatedCart: any) {
    this.apiService.update('carts/1', updatedCart).subscribe({
      next: (response) => console.log('Cart synced successfully:', response),
      error: (err) => console.error('Error syncing cart:', err),
    });
  }

  // Menghapus produk dari keranjang
  removeFromCart(product: any) {
    console.log('Removing from cart:', product)
    this.apiService.deleteData('carts/', product).subscribe({
      next: (response) => console.log('Product removed from cart:', response),
      error: (err) => console.error('Error removing product from cart:', err),
    })
    // this.cart = this.cart.filter((product) => product.id !== productId);
  }

  // Mengosongkan keranjang
  clearCart() {
    this.cart = [];
  }

  // Mendapatkan total harga
  getTotal() {
    // console.log('Calculating total price:', this.cart);
    this.getCart().subscribe({
      next: (cartItems) => {
        cartItems.forEach((data) => {
          this.cart.push(data.products)
        })
        // console.log('Total:', this.cart);
      },
      error: (error) => {
        console.error('Error fetching cart items:', error.message);
      }
    })
    return this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }
}