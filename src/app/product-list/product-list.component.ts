import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  isSidebarOpen = true;
  role!: string;

  constructor(private productService: ProductService, private router: Router) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  ngOnInit(): void {
    this.role = 'CONFIRMED';
    if (this.role == 'SELLER')
      this.getProductsByUsernameUrl('khalil.farouqi');
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
