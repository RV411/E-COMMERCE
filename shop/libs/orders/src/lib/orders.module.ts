import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CarIconComponent } from './components/car-icon/car-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import {RouterModule, Routes } from '@angular/router';

import { BadgeModule } from 'primeng/badge';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  // {
  //   path: 'cart',
  //   component: CartPageComponent
  // },
  // {
  //   path: 'checkout',
  //   component: CheckoutPageComponent
  // },
  // {
  //   path: 'success',
  //   component: ThankYouComponent
  // }
];


@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule
  ],
  declarations: [
    CarIconComponent,
    OrderSummaryComponent
  ],
  exports: [
    CarIconComponent,
    OrderSummaryComponent
  ],
})
export class OrdersModule {
  constructor(cartService:CartService){
    cartService.initCartLocalStorage();
  }
}
