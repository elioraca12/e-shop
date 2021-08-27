import { Component, OnInit } from '@angular/core';
import {InventoryService} from "../service/inventory.service";
import {DeliveryService} from "../service/delivery.service";
import {Size} from "../model/size";
import {InventoryState} from "../model/inventory-state";
import {Product} from "../model/product";
import {SizeService} from "../service/size.service";
import {ProductService} from "../service/product.service";
import {InventoryStateService} from "../service/inventory-state.service";

@Component({
  selector: 'app-add-inventory-form',
  templateUrl: './add-inventory-form.component.html',
  styleUrls: ['./add-inventory-form.component.css']
})
export class AddInventoryFormComponent implements OnInit {

  sizes: Size[]
  products: Product[]
  inventoryStates: InventoryState[]

  constructor(

    public inventoryService: InventoryService,
    private deliveryService: DeliveryService,
    private sizeService: SizeService,
    private productService: ProductService,
    private inventoryStateService: InventoryStateService

  ){

    this.sizes = []
    this.products = []
    this.inventoryStates = []

    this.dataRetriever().then()

  }

  ngOnInit(): void {

    this.inventoryService.form.reset();

  }

  onClear() {

    this.inventoryService.initializeFormGroup();
    this.inventoryService.form.reset();

  }

  async onSubmit() {

    if (this.inventoryService.form.valid) {

      await this.inventoryService.addInventoryEntry(this.inventoryService.form.value).pipe().toPromise()
      this.inventoryService.form.reset();
      this.inventoryService.initializeFormGroup();
      this.deliveryService.refresh()

    }

  }

  async dataRetriever(){

    this.sizes = await this.sizeService.getSizes().pipe().toPromise()
    this.products = await this.productService.getProducts().pipe().toPromise()
    this.inventoryStates = await this.inventoryStateService.getInventoryStates().pipe().toPromise()

  }

}
