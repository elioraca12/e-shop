import {Component, OnInit, ViewChild} from '@angular/core';
import {Inventory} from "../model/inventory";
import {DeliveryService} from "../service/delivery.service";
import {InventoryService} from "../service/inventory.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSliderChange} from "@angular/material/slider";
import {OrderItem} from "../model/order-item";
import {BailiffService} from "../service/bailiff.service";
import {User} from "../model/user";

@Component({
  selector: 'app-order-show',
  templateUrl: './order-show.component.html',
  styleUrls: ['./order-show.component.css']
})
export class OrderShowComponent implements OnInit {

  inventoryData: Inventory[] = [];
  displayedColumns: string[] = ['id', 'product', 'size', 'product_price', 'size_surcharge', 'commission', 'quantity', 'action'];
  dataSource: any;
  toDisableOrderButton = true

  constructor(

    private deliveryService: DeliveryService,
    private bailiffService: BailiffService,
    private inventoryService: InventoryService

  ){}

  ngOnInit(): void {
    this.getInventoryEntries().then()
  }

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (element: any) => {

      const dataStr =
        element.product.name +
        element.size.sizeNaming.fullName +
        element.product.price +
        element.size.surcharge +
        element.product.commission +
        element.quantity +
        element.id;

      return dataStr.trim().toLowerCase().indexOf(filterValue) != -1;

    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  private async getInventoryEntries() {

    this.inventoryData = await this.inventoryService.getAvailableInventoryEntries().pipe().toPromise<Inventory[]>()

    this.dataSource = new MatTableDataSource<Inventory>(this.inventoryData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (element: any, property: any) => {

      switch (property) {
        case 'product':
          return element.product.name;
        case 'size':
          return element.size.sizeNaming.fullName;
        case 'product_price':
          return element.product.price;
        case 'size_surcharge':
          return element.size.surcharge;
        case 'commission':
          return element.product.commission;
        default:
          return element[property];

      }

    };

  }

  formatLabel(value: number) {

    return value;

  }

  onInputChange($event: MatSliderChange) {

    this.toDisableOrderButton = $event.value === 0;

  }

  makeOrder(inventoryEntry: Inventory, orderQuantity: number) {

    let tokenUser: User = new User()
    let order: OrderItem = new OrderItem()

    let jwtToken = sessionStorage.getItem("token")
    this.bailiffService.assignPayload(<string>jwtToken)
    this.deliveryService.broadcastedData.pipe().subscribe((loggedUser: User) => {

      tokenUser = loggedUser

    })

    order.inventoryEntry = inventoryEntry
    order.quantity = orderQuantity
    order.tokenUser = tokenUser

    this.deliveryService.broadcast(order)
    this.deliveryService.redirect('/checkout')

  }
}
