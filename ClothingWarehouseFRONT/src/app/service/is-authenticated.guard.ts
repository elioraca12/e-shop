import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {DeliveryService} from "./delivery.service";

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private deliveryService: DeliveryService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isAuthenticated = this.authService.isLoggedIn()

    if (!isAuthenticated){

      alert("You have to login in order to get to the content")
      this.deliveryService.redirect("")

    }

    return this.authService.isLoggedIn();

  }

}
