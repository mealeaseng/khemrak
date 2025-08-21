import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  @Input() product: any;
  @Output() AddToCart = new EventEmitter<any>();

  ngOnInit() {
    const saveMap = localStorage.getItem('productAddCartMap');
    const addcartMap = saveMap ? JSON.parse(saveMap) : {};

    if (this.product?.id && addcartMap[this.product.id]) {
      this.product.addcart = addcartMap[this.product.id];
    } else {
      this.product.addcart = 0;
    }
  }

cartadd(product: any) {
  product.addcart = (product.addcart || 0) + 1;

  // 🚀 Emit to parent
  this.AddToCart.emit(product);

  // Save to map
  const saveMap = localStorage.getItem('productAddCartMap');
  const addcartMap = saveMap ? JSON.parse(saveMap) : {};
  addcartMap[product.id] = product.addcart;

  localStorage.setItem('productAddCartMap', JSON.stringify(addcartMap));
}

}
