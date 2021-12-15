import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dashboardValores = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.OrdersCount(),
      this.productService.ProductsCount(),
      this.userService.UsersCount(),
      this.ordersService.TotalSales()
    ]).subscribe((values) => {
      this.dashboardValores = values;
    });
  }
}

