import {Injectable} from '@angular/core';
import {DeliveryService} from "./delivery.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BailiffService{

  constructor(

    private deliveryService: DeliveryService,
    private http: HttpClient

  ){ }

  public async assignPayload(accessToken: string){

    const headers = new HttpHeaders().set('Authorization', "Bearer " + accessToken)
    let payload = await this.http.post(environment.api.PAYLOAD_API + environment.method.GET , accessToken, {headers: headers}).pipe().toPromise()
    this.deliveryService.broadcast(payload)

  }

}
