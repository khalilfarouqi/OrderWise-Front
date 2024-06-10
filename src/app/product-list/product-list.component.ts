import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  isSidebarOpen = true;

  constructor(private productService: ProductService) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProductUrl().subscribe(
      (data) => {
        console.log(data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
