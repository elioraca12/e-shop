import {Inventory} from "./inventory";
import {User} from "./user";

export class OrderItem{

  tokenUser: any
   inventoryEntry: Inventory
   quantity: number


  constructor() {
    this.tokenUser = new User()
    this.inventoryEntry = new Inventory()
    this.quantity = 0
  }

}
