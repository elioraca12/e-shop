import { Component} from '@angular/core';
import {BailiffService} from "../service/bailiff.service";
import {DeliveryService} from "../service/delivery.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  payload: any;

  constructor(

    private bailiffService: BailiffService,
    public deliveryService: DeliveryService,
    public authService: AuthService

  ) {

    let accessToken = sessionStorage.getItem("token")
    // @ts-ignore
    this.bailiffService.assignPayload(accessToken).then()
    this.deliveryService.broadcastedData.pipe().subscribe((payload: any) => {

      this.payload = payload

    })

  }

}

