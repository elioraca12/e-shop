import {Component} from '@angular/core';
import {DeliveryService} from "../service/delivery.service";
import {Transaction} from "../model/transaction";
import {UserService} from "../service/user.service";
import {Inventory} from "../model/inventory";
import {TransactionService} from "../service/transaction.service";
import {OrderItem} from "../model/order-item";
import {User} from "../model/user";
import {InventoryService} from "../service/inventory.service";
import {InventoryStateService} from "../service/inventory-state.service";
import {InventoryState} from "../model/inventory-state";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  order: OrderItem;
  newTransaction: Transaction;

  inventory: Inventory;
  quantity: number;
  tokenUser: any;

  constructor(

    private deliveryService: DeliveryService,
    private userService: UserService,
    private transactionService: TransactionService,
    private inventoryService: InventoryService,
    private inventoryStateService: InventoryStateService

  ){

    this.order = new OrderItem()
    this.newTransaction = new Transaction()
    this.inventory = new Inventory()
    this.quantity = 0

    this.deliveryService.broadcastedData.pipe().subscribe((order: OrderItem) => {

      this.order = order

    })

    this.inventory = this.order.inventoryEntry
    this.quantity = this.order.quantity
    this.tokenUser = this.order.tokenUser

  }

  async confirmOrder() {

    let username = this.tokenUser.sub
    let formulaResult = this.quantity * (this.inventory.product.price + this.inventory.product.commission + this.inventory.size.surcharge)

    let updatedQuantity = this.inventory.quantity - this.quantity
    this.inventory.quantity = updatedQuantity
    if (this.inventory.quantity == 0){
      console.log("step 1")
      this.inventory.inventoryState = await this.inventoryStateService.getInventoryState(4).pipe().toPromise<InventoryState>()
      console.log(this.inventory.inventoryState)
    }
    await this.inventoryService.editInventoryEntry(this.inventory).pipe().toPromise<Inventory>()

    this.newTransaction.user = await this.userService.getUser(username).pipe().toPromise<User>()
    this.newTransaction.inventory= this.inventory
    this.newTransaction.soldPrice = formulaResult
    this.newTransaction.transactionDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
    this.newTransaction.id = 0

    await this.transactionService.addTransaction(this.newTransaction).pipe().toPromise<Transaction>()
    this.deliveryService.redirect("/dashboard/news")

  }

  back(){

    this.deliveryService.redirect('/dashboard/order')

  }

}
