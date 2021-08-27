import { Component } from '@angular/core';
import {ProductService} from "../service/product.service";
import {DeliveryService} from "../service/delivery.service";

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css']
})
export class UpdateProductFormComponent {

  constructor(

    public service:ProductService,
    private deliveryService: DeliveryService

  ){ }

  onClear() {

    this.service.initializeFormGroup();
    this.service.form.reset();

  }

  onSubmit(){

    if (this.service.form.valid){

      delete this.service.form.value.$key
      this.service.editProduct(this.service.form.value).pipe().subscribe()
      console.log(this.service.form.value)
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.deliveryService.refresh()

    }

  }

}
