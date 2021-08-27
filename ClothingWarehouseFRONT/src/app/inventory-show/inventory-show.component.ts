import {Component, OnInit, ViewChild} from '@angular/core';
import {Inventory} from "../model/inventory";
import {DeliveryService} from "../service/delivery.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {InventoryService} from "../service/inventory.service";
import {BailiffService} from "../service/bailiff.service";
import {AddInventoryFormComponent} from "../add-inventory-form/add-inventory-form.component";
import {UpdateInventoryFormComponent} from "../update-inventory-form/update-inventory-form.component";

@Component({
  selector: 'app-inventory-show',
  templateUrl: './inventory-show.component.html',
  styleUrls: ['./inventory-show.component.css']
})
export class InventoryShowComponent implements OnInit {

  inventoryData: Inventory[] = [];
  displayedColumns: string[] = ['id', 'product', 'size', 'inventoryState', 'quantity', 'soldDate', 'soldPrice', 'action'];
  dataSource: any;
  payload: any;

  constructor(

    private deliveryService: DeliveryService,
    private inventoryService: InventoryService,
    public bailiffService: BailiffService,
    private dialog: MatDialog

  ){

    let accessToken = sessionStorage.getItem("token")

    this.bailiffService.assignPayload(<string>accessToken).then()

    this.deliveryService.broadcastedData.pipe().subscribe((payload: any) => {

      this.payload = payload

    })

  }

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
        element.id +
        element.product.name +
        element.size.sizeNaming.fullName +
        element.inventoryState.name +
        element.quantity +
        element.soldDate +
        element.soldPrice;

      return dataStr.trim().toLowerCase().indexOf(filterValue) != -1;

    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  private async getInventoryEntries() {

    this.inventoryData = await this.inventoryService.getInventoryEntries().pipe().toPromise<Inventory[]>()

    this.dataSource = new MatTableDataSource<Inventory>(this.inventoryData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (element: any, property: any) => {
      switch (property) {
        case 'product': return  element.product.name;
        case 'size': return  element.size.sizeNaming.fullName;
        case 'inventoryState': return element.inventoryState.name;
        default: return element[property];
      }
    };

  }

  async deleteInventoryEntry(product: any) {

    await this.inventoryService.deleteInventoryEntry(product).pipe().subscribe()

    this.deliveryService.refresh()

  }

  addInventoryEntry() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false
    this.dialog.open(AddInventoryFormComponent, dialogConfig);

  }

  editInventoryEntry(element: Inventory) {

    this.inventoryService.populateForm(element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateInventoryFormComponent, dialogConfig);

  }

}
