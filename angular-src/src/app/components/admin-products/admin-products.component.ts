import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { ProductService } from '../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  name: String;
  description: String;
  brand: String;
  products: Object;

  constructor(
    private validateService: ValidateService,
    private productService: ProductService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
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

  onRegisterSubmit(){
    const product = {

      name: this.name,
      description: this.description,
      brand: this.brand

    }

    // Check if required fields are filed
    if(!this.validateService.validateProduct(product)){

      this._flashMessagesService.show('Please fill in all the missing fields', {
        cssClass: 'alert-danger',
      });

      return false;
    }

    // Register Product
    this.productService.registerProduct(product).subscribe((data: any) => {
      if(data.success){

        this._flashMessagesService.show('Product has been registered', {
          cssClass: 'alert-success',
        });
        this.router.navigate(['/admin/products']);

      } else {

        this._flashMessagesService.show('Something went wrong', {
          cssClass: 'alert-danger',
        });

        this.router.navigate(['/admin/products']);
      }
    });
  }

}
