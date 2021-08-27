import {Component} from '@angular/core';
import {InventoryService} from "../service/inventory.service";
import {DeliveryService} from "../service/delivery.service";
import {Size} from "../model/size";
import {Product} from "../model/product";
import {InventoryState} from "../model/inventory-state";
import {SizeService} from "../service/size.service";
import {ProductService} from "../service/product.service";
import {InventoryStateService} from "../service/inventory-state.service";

@Component({
  selector: 'app-update-inventory-form',
  templateUrl: './update-inventory-form.component.html',
  styleUrls: ['./update-inventory-form.component.css']
})
export class UpdateInventoryFormComponent {

  sizes: Size[]
  products: Product[]
  inventoryStates: InventoryState[]

  constructor(

    public inventoryService: InventoryService,
    private deliveryService: DeliveryService,
    private sizeService: SizeService,
    private productService: ProductService,
    private inventoryStateService: InventoryStateService

  ) {

    this.sizes = []
    this.products = []
    this.inventoryStates = []

    this.dataRetriever().then()

  }

  onClear() {

    this.inventoryService.initializeFormGroup();
    this.inventoryService.form.reset();

  }

  async onSubmit() {

    if (this.inventoryService.form.valid) {

      let formObject = this.inventoryService.form.value

      console.log(formObject)

      formObject.inventoryState = await this.inventoryStateService.getInventoryState(formObject.inventoryState).pipe().toPromise()
      formObject.product = await this.productService.getProduct(formObject.product).pipe().toPromise()
      formObject.size = await this.sizeService.getSize(formObject.size).pipe().toPromise()

      delete this.inventoryService.form.value.$key

      await this.inventoryService.editInventoryEntry(formObject).pipe().toPromise()
      this.onClear()
      this.deliveryService.refresh()

    }

  }

  async dataRetriever(){

    this.sizes = await this.sizeService.getSizes().pipe().toPromise()
    this.products = await this.productService.getProducts().pipe().toPromise()
    this.inventoryStates = await this.inventoryStateService.getInventoryStates().pipe().toPromise()

  }

}
