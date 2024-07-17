import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  isSidebarOpen = true;

  role!: string;
  username!: string;

  constructor(private productService: ProductService, 
    private router: Router,
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

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  ngOnInit(): void {
    if (this.role == 'SELLER')
      this.getProductsByUsernameUrl(this.username);
    else if(this.role == 'ADMIN')
      this.getAllProducts();
  }

  getProductsByUsernameUrl(username: string) {
    this.productService.getProductsByUsernameUrl(username).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getAllProducts() {
    this.productService.getProductUrl().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-page', productId]);
  }

}
