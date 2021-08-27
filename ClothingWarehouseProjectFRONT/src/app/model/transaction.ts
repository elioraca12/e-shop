import {Inventory} from "./inventory";
import {User} from "./user";

export class Transaction{

   id: number
   soldPrice: number
   transactionDate: string
   inventory: Inventory
   user: User


  constructor() {
    this.id = 0
    this.soldPrice = 0
    this.transactionDate = ""
    this.inventory = new Inventory()
    this.user = new User()
  }

}
