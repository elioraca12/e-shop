import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {DeliveryService} from "./delivery.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private deliveryService: DeliveryService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let jwtToken = <string>sessionStorage.getItem("token")
    let encryptedPayload = jwtToken.split(".")[1]
    let decryptedPayload = atob(encryptedPayload)

    let loggedUser = JSON.parse(decryptedPayload)

    let isAuthorized = loggedUser.roles.includes(route.data.role)

    if(!isAuthorized){

      alert("You are not authorized for this page!")
      this.deliveryService.redirect("/dashboard/news")

    }

    return isAuthorized;

  }

}
