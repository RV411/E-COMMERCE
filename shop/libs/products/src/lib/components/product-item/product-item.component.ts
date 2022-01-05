import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService,CartItem } from '@bluebits/orders';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})

export class ProductItemComponent{
  @Input() product: Product;

  constructor(private cartService:CartService) {}

  addItemCart(){
    const cartItem:CartItem={
      productId:this.product._id,
      quantity:1
    };
    this.cartService.setCartItem(cartItem);
  }
}
