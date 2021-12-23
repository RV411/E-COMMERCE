import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OrdersModule } from '@bluebits/orders';
import { ProductsModule } from '@bluebits/products';
import { UiModuleModule } from '@bluebits/ui';


import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    NavComponent,
  ],
  imports: [
    AccordionModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    OrdersModule,
    ProductsModule,
    RouterModule.forRoot(routes),
    UiModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
