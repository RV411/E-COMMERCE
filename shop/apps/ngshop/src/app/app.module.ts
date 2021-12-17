import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsModule } from '@bluebits/products';

import { AccordionModule } from 'primeng/accordion';
import { UiModuleModule } from '@bluebits/ui';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    ProductListComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ProductsModule,
    AccordionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
