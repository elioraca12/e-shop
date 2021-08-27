import {InventoryState} from "./inventory-state";
import {Product} from "./product";
import {Size} from "./size";

export class Inventory{

   id: number
   quantity: number
   soldDate: string
   soldPrice: number
   inventoryState: InventoryState
   product: Product
   size: Size


  constructor(){

    this.id = 0
    this.quantity = 0
    this.soldDate = ""
    this.inventoryState = new InventoryState()
    this.soldPrice = 0
    this.product = new Product()
    this.size = new Size()

  }

}
