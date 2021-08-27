import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Role} from "../model/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles(){

    return this.http.get<Role[]>(
      environment.api.BASE_ROLE_API +
      environment.method.GET_ALL
    )

  }

}
