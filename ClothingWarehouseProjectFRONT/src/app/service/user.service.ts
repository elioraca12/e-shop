import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({

    $key: new FormControl(null),
    id: new FormControl(0),
    firstname: new FormControl(''),
    lastname: new FormControl('',),
    email: new FormControl('', [Validators.email]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])

  });

  initializeFormGroup() {

    this.form.setValue({

      $key: null,
      id: 0,
      firstname: "",
      lastname: "",
      email: 0,
      username: 0,
      password: 0

    });

  }

  getUser(username: string) {

    let accessToken = sessionStorage.getItem("token")
    const header = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<User>(
      environment.api.BASE_USER_API +
      environment.method.GET +
      environment.query_parameter.USERNAME + username
      , {headers: header})

  }

  addUser(newUser: any){

    return this.http.post<User>(
      environment.api.BASE_USER_API +
      environment.method.POST
      , newUser)

  }

}
