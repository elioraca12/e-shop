import {Component, OnInit, ViewChild} from '@angular/core';
import {DeliveryService} from "../service/delivery.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {TransactionService} from "../service/transaction.service";
import {Transaction} from "../model/transaction";

@Component({
  selector: 'app-transaction-show',
  templateUrl: './transaction-show.component.html',
  styleUrls: ['./transaction-show.component.css']
})
export class TransactionShowComponent implements OnInit {

  transactionData: Transaction[] = [];
  displayedColumns: string[] = ['id', 'user', 'product', 'inventory', 'soldPrice', 'transactionDate'];
  dataSource: any;

  constructor(

    private deliveryService: DeliveryService,
    private transactionService: TransactionService

  ){ }

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
        element.user.firstname + " " + element.user.lastname +
        element.inventory.product.name +
        element.inventory.id +
        element.soldPrice +
        element.transactionDate;

      return dataStr.trim().toLowerCase().indexOf(filterValue) != -1;

    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  private async getInventoryEntries() {

    this.transactionData = await this.transactionService.getTransactions().pipe().toPromise<Transaction[]>()

    this.dataSource = new MatTableDataSource<Transaction>(this.transactionData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (element: any, property: any) => {

      switch (property) {

        case 'user': return  element.user.firstname + " " + element.user.lastname;
        case 'product': return  element.inventory.product.name;
        case 'inventory': return element.inventory.id;
        default: return element[property];

      }

    };

  }

}
