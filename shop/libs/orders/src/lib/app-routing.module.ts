import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@bluebits/users';

import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

const routes: Routes = [
    {
      path: 'cart',
      component: CartPageComponent
    },
    {
      path: 'checkout',
      canActivate:[AuthGuard],
      component: CheckoutPageComponent
    },
    {
      path: 'success',
      component: ThankYouComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
  ];


@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class AppRoutingModule {}