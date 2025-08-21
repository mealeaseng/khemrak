import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-total-product',
  imports: [],
  templateUrl: './total-product.html',
  styleUrl: './total-product.css'
})
export class TotalProduct {
    allProduct: any[] = [];
  ngOnInit(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        this.allProduct = Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        console.error('Invalid cart data:', err);
      }
    }
  }

  get totalAllProduct(): number {
  return this.allProduct.reduce((acc, product) => {
    return acc + product.price * product.addcart;
  }, 0);
}
    payNow() {
      alert() 
   }
}
