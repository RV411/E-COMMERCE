import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '@bluebits/orders';
import { CartItem } from '../../../../../orders/src/lib/models/cart';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})

export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService:CartService) {}

  ngOnInit(): void {}

  addItemCart(){
    const cartItem:CartItem;
    this.cartService.setCartItem();
  }
}
