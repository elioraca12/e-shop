import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Size} from "../model/size";

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  getSizes(){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<Size[]>(environment.api.BASE_SIZE_API + environment.method.GET_ALL, {headers: headers})

  }

  getSize(sizeId: number) {

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<Size>(environment.api.BASE_SIZE_API + environment.method.GET + "/" + sizeId, {headers: headers})

  }

}
