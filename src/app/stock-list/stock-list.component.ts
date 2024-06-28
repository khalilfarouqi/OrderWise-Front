import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];
  isSidebarOpen = true;
  role!: string; 

  constructor(private stockService: StockService, private router: Router) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    this.role = 'SELLER';
    if (this.role == 'SELLER')
      this.getStocksByUsernameUrl('khalil.farouqi');
    else if(this.role == 'ADMIN')
      this.getAllStocks();
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

  getAllStocks() {
    this.stockService.getStockUrl().subscribe(
      (data) => {
        this.stocks = data;
      },
      (error) => {
        console.error('Error fetching stocks:', error);
      }
    );
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-page', productId]);
  }

}
