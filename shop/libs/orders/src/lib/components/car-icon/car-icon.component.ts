import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-car-icon',
  templateUrl: './car-icon.component.html'
})
export class CarIconComponent implements OnInit {
  cartCount=0;
  constructor(private cartService:CartService) { }
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
  }
}
