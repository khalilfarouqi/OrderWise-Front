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
    this.getStocksByUsernameUrl('khalil.farouqi');
  }

  getStocksByUsernameUrl(username: string) {
    this.stockService.getStocksByUsernameUrl(username).subscribe(
      (data) => {
        this.stocks = data;
      },
      (error) => {
        console.error('Error fetching stocks:', error);
      }
    );
  }

}
