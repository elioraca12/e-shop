import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  public dataToBroadcast: any
  public broadcastedData: any

  constructor(private router: Router){

    this.dataToBroadcast = new BehaviorSubject<any>(null)
    this.broadcastedData = this.dataToBroadcast.asObservable()

  }

  broadcast(data: any){

    this.dataToBroadcast.next(data)

  }

  unzip(){

    let accessToken = "";

    this.broadcastedData.pipe().subscribe((receivedData: any)=>{

      accessToken = receivedData.accessToken

    })

    return accessToken

  }

  redirect(url: string){

    this.router.navigate([`/${url}`]).then();

  }

  refresh(){

    window.location.reload();

  }

}
