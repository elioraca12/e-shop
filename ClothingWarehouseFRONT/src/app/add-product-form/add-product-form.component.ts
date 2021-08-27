import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {DeliveryService} from "../service/delivery.service";

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  constructor(public productService:ProductService, private deliveryService: DeliveryService) { }

  ngOnInit(): void {

    this.productService.form.reset();

  }

  onClear() {

    this.productService.initializeFormGroup();
    this.productService.form.reset();

  }

  async onSubmit() {

    if (this.productService.form.valid) {

      await this.productService.addProduct(this.productService.form.value).pipe().toPromise()
      this.onClear()
      this.deliveryService.refresh()

    }

  }

}
