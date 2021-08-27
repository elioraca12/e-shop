import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {InventoryState} from "../model/inventory-state";

@Injectable({
  providedIn: 'root'
})
export class InventoryStateService {

  constructor(private http: HttpClient) { }

  getInventoryStates(){

    let accessToken = sessionStorage.getItem("token")
    const header = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<InventoryState[]>(environment.api.BASE_INVENTORY_STATE_API + environment.method.GET_ALL, {headers: header})

  }

  getInventoryState(inventoryStateId: number){

    let accessToken = sessionStorage.getItem("token")
    const header = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<InventoryState>(environment.api.BASE_INVENTORY_STATE_API + environment.method.GET + "/" + inventoryStateId, {headers: header})

  }

}
