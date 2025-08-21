import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../cart/cart';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-hompgae',
  imports: [Cart, RouterLink, NgClass],
  templateUrl: './hompgae.html',
  styleUrl: './hompgae.css'
})
export class Homepgae implements OnInit {
  cart: any[] = [];
  http = inject(HttpClient);
  products: any[] = []; // Product list

  itemCount: number = 0;      // Number of items
  totalPrice: number = 0;     // Total price

  images = [
    'https://i.pinimg.com/1200x/ab/36/1c/ab361c150cc336a6ca7a3c9ecb89d431.jpg',
    'https://i.pinimg.com/1200x/15/72/45/157245b62f44cceec0b6bdf45e3ddb4c.jpg',
    'https://i.pinimg.com/736x/7b/73/b1/7b73b1e3182195649dc9735d1e4b9fcc.jpg',
  ];


  //   { id: 1, addcart: 0, name: "Smart Watch", price: 49.99, dis: "Lightweight and feature-rich fitness tracker.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081937.png", discount: 10 },
  //   { id: 2, addcart: 0, name: "Wireless Headphones", price: 89.00, dis: "Noise-cancelling headphones with long battery life.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081942.png", discount: 15 },
  //   { id: 3, addcart: 0, name: "Mini Speaker", price: 25.50, dis: "Portable Bluetooth speaker with rich bass.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 5 },
  //   { id: 4, addcart: 0, name: "Smartphone Stand", price: 8.75, dis: "Adjustable desk phone holder for all sizes.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 0 },
  //   { id: 5, addcart: 0, name: "USB-C Charger", price: 14.20, dis: "Fast charging wall adapter with USB-C port.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 7 },
  //   { id: 6, addcart: 0, name: "Laptop Sleeve", price: 17.99, dis: "Water-resistant sleeve for 13-15 inch laptops.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 12 },
  //   { id: 7, addcart: 0, name: "Wireless Mouse", price: 12.49, dis: "Ergonomic mouse with silent clicking.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 5 },
  //   { id: 8, addcart: 0, name: "LED Desk Lamp", price: 29.95, dis: "Touch control lamp with brightness adjustment.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 8 },
  //   { id: 9, addcart: 0, name: "Power Bank", price: 39.00, dis: "10000mAh fast-charging power bank.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 10 },
  //   { id: 10, addcart: 0, name: "Fitness Tracker Band", price: 19.99, dis: "Track your daily steps, sleep, and heart rate.", image: "https://cdn-icons-png.flaticon.com/512/3081/3081932.png", discount: 6 }
  // ];

Addproduct(productitem: any) {
  const index = this.cart.findIndex(p => p.id === productitem.id);

  if (index === -1) {
    // New product – clone it and push
    this.cart.push({ ...productitem });
  } else {
    // Update the existing product quantity
    this.cart[index].addcart = productitem.addcart;
  }

  // 🔁 Recalculate total item count
  this.itemCount = this.cart.reduce((sum, item) => sum + item.addcart, 0);

  this.saveCart();
}



 ClearCart() {
  this.cart = [];
  this.itemCount = 0;
  this.totalPrice = 0;
  localStorage.removeItem('cart');
  localStorage.removeItem('totalPrice');
  localStorage.removeItem('productAddCartMap');

  // Reset each product's quantity
  this.products.forEach(product => product.addcart = 0);
}




  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('itemCount', JSON.stringify(this.itemCount));
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
}

  ngOnInit(): void {
  this.GetProducts();

  const cartData = localStorage.getItem('cart');
  const productMap = localStorage.getItem('productAddCartMap');

  if (cartData) {
    this.cart = JSON.parse(cartData);

    // Restore quantities
    if (productMap) {
      const parsedMap = JSON.parse(productMap);
      this.cart.forEach(p => {
        if (parsedMap[p.id]) {
          p.addcart = parsedMap[p.id];
        }
      });
    }

    // 🔁 Recalculate item count after restore
    this.itemCount = this.cart.reduce((sum, item) => sum + item.addcart, 0);
  }

  this.startAutoSlide();
}
 


  currentIndex = 0;
  intervalId: any;

  GetProducts():void {
    this.http.get('https://dummyjson.com/products').subscribe((response: any) => {
      this.products = response.products;
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000); // change slide every 4 seconds
  }
}
