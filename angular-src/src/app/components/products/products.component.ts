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
    this.productService.getProducts().subscribe(data => {
      this.products = data.products;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
