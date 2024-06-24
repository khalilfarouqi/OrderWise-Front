import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  product: any;
  isSidebarOpen = true;

  constructor(private route: ActivatedRoute, public productService: ProductService) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.getProductsByIdUrl(productId);
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  getProductsByIdUrl(id: number) {
    this.productService.getProductsByIdUrl(id).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
  
}
