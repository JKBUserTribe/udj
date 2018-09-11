import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Object;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.products.slice(0, 25);
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
