import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StockDialogComponent } from '../stock-dialog/stock-dialog.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];
  isSidebarOpen = true;

  role!: string;
  username!: string;

  constructor(private stockService: StockService, 
    private router: Router, 
    private dialog: MatDialog,
    private authService: AuthService) {
      this.authService.isLoggedIn().then(loggedIn => {
        if (loggedIn) {
          this.username = this.authService.getUsername();
          this.role = this.authService.getUserRole();
        } else {
          this.authService.login();
        }
      });
  }

  openModal(productInStock: any): void {
    const dialogRef = this.dialog.open(StockDialogComponent, {
      width: '600px',
      data: { productInStock }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateStock(result);
      }
    });
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    if (this.role == 'SELLER')
      this.getStocksByUsernameUrl(this.username);
    else if(this.role == 'ADMIN')
      this.getAllStocks();
  }
  
  updateStock(productInStock: any): void {
    this.stockService.putStockForm(productInStock).subscribe({
      next: (response) => {
        this.showAlert('Update successful', '', 'success');
        this.ngOnInit();
      },
      error: (error) => {
        this.showAlert('Update no successful', '', 'error');
      }
    });
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

  showAlert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }

}
