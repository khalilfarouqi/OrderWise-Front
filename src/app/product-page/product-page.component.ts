import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  product: any;
  isSidebarOpen = true;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.getProductsByIdUrl(1);
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  getProductsByIdUrl(id: number) {
    this.productService.getProductsByIdUrl(id).subscribe(
      (data) => {
        console.log(data);
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
  
}
