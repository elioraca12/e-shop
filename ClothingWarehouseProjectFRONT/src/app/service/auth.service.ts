import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {DeliveryService} from "./delivery.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private http: HttpClient,
    private router: Router,
    private deliveryService: DeliveryService

  ){ }

  async login(data: any) {

    let body = new URLSearchParams()
    body.set("username", data.username)
    body.set("password", data.password)
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    let jwtToken = await this.http.post(environment.api.LOGIN_API, body, {headers: headers}).pipe().toPromise()
    this.deliveryService.broadcast(jwtToken)

    let token = this.deliveryService.unzip()
    sessionStorage.setItem("token", token)

    this.deliveryService.redirect("/dashboard/news")

  }

  logout() {

    sessionStorage.clear()
    this.deliveryService.redirect('')

  }

  isLoggedIn(){

    return sessionStorage.getItem("token") != null;

  }

}
