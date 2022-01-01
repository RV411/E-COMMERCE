import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CarIconComponent } from './components/car-icon/car-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

import { CartService } from './services/cart.service';

import { BadgeModule } from 'primeng/badge';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  }
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
    CartPageComponent,
    CheckoutPageComponent,
    OrderSummaryComponent,
    ThankYouComponent,
  ],
  exports: [
    CarIconComponent,
    CartPageComponent,
    OrderSummaryComponent
  ],
})
export class OrdersModule {
  constructor(cartService:CartService){
    cartService.initCartLocalStorage();
  }
}
