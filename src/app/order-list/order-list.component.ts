import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  isSidebarOpen = true;

  constructor(private orderService: OrderService) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrderUrl().subscribe(
      (data) => {
        console.log(data);
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

}
