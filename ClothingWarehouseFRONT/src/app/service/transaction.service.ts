import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Transaction} from "../model/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransactions(){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<Transaction[]>(environment.api.BASE_TRANSACTION_API + environment.method.GET_ALL, {headers: headers})

  }

  addTransaction(transaction: Transaction) {

    let accessToken = sessionStorage.getItem("token")
    const header = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.post<Transaction>(environment.api.BASE_TRANSACTION_API + environment.method.POST, transaction, {headers: header})

  }

}
