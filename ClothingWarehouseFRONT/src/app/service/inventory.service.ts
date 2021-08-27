import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../environments/environment";
import {Inventory} from "../model/inventory";
import {InventoryState} from "../model/inventory-state";
import {Product} from "../model/product";
import {Size} from "../model/size";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public currentState = new InventoryState()
  public currentProduct = new Product()
  public currentSize = new Size()

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({

    $key: new FormControl(null),
    id: new FormControl(0),
    quantity: new FormControl(10, Validators.required),
    soldDate: new FormControl(Date, [Validators.required]),
    soldPrice: new FormControl(0.99, [Validators.required]),
    inventoryState: new FormControl('',[Validators.required]),
    product: new FormControl('',[Validators.required]),
    size: new FormControl('', [Validators.required])

  });

  initializeFormGroup() {

    this.form.setValue({

      $key: null,
      id: 0,
      quantity: 10,
      soldDate: Date,
      soldPrice: 0.99,
      inventoryState: '',
      product:'',
      size: ''

    });

  }

  populateForm(inventoryEntry: Inventory){

    this.form.setValue({

      $key: null,
      id: inventoryEntry.id,
      quantity: inventoryEntry.quantity,
      soldDate: inventoryEntry.soldDate,
      soldPrice: inventoryEntry.soldPrice,
      inventoryState: inventoryEntry.inventoryState.id,
      product: inventoryEntry.product.id,
      size: inventoryEntry.size.sizeNaming.id

    })

  }

  getInventoryEntries(){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<Inventory[]>(environment.api.BASE_INVENTORY_API + environment.method.GET_ALL, {headers: headers})

  }

  getAvailableInventoryEntries(){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<Inventory[]>(
      environment.api.BASE_INVENTORY_API + environment.method.GET_AVAILABLE ,{headers: headers})

  }

  addInventoryEntry(inventoryEntry: Inventory){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.post<Inventory>(environment.api.BASE_INVENTORY_API + environment.method.POST ,inventoryEntry ,{headers: headers})

  }

  editInventoryEntry(inventoryEntry: Inventory){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.put<Inventory>(
      environment.api.BASE_INVENTORY_API +
      environment.method.UPDATE +
      "/" +
      inventoryEntry.id,inventoryEntry,{headers: headers})

  }

  deleteInventoryEntry(inventoryEntry: Inventory){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.delete<Inventory>(
      environment.api.BASE_INVENTORY_API +
      environment.method.DELETE +
      "/" +
      inventoryEntry.id,{headers: headers})

  }

}
