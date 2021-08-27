import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Product} from "../model/product";
import {DeliveryService} from "../service/delivery.service";
import {ProductService} from "../service/product.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddProductFormComponent} from "../add-product-form/add-product-form.component";
import {UpdateProductFormComponent} from "../update-product-form/update-product-form.component";
import {BailiffService} from "../service/bailiff.service";


@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {

  productData: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'cost', 'commission','action'];
  dataSource: any;
  payload: any;

  constructor(

    private deliveryService: DeliveryService,
    private productService: ProductService,
    private dialog: MatDialog,
    private bailiffService: BailiffService

  ){

    let accessToken = sessionStorage.getItem("token")

    this.bailiffService.assignPayload(<string>accessToken).then()
    this.deliveryService.broadcastedData.pipe().subscribe((payload: any) => {

      this.payload = payload

    })

  }

  ngOnInit(): void {

    this.getProducts()

  }

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  async getProducts() {

    this.productData = await this.productService.getProducts().pipe().toPromise()

    this.dataSource = new MatTableDataSource<Product>(this.productData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  async deleteProduct(product: any){

    await this.productService.deleteProduct(product).pipe().subscribe()

    this.deliveryService.refresh()

  }

  addProduct(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false
    this.dialog.open(AddProductFormComponent,dialogConfig);

  }


  editProduct(element: Product) {

    this.productService.populateForm(element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateProductFormComponent,dialogConfig);

  }
}

