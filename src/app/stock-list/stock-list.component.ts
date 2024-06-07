import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];
  isSidebarOpen = true;

  constructor(private stockService: StockService) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.stockService.getStockUrl().subscribe(
      (data) => {
        console.log(data);
        this.stocks = data;
      },
      (error) => {
        console.error('Error fetching stocks:', error);
      }
    );
  }

}
