import {Component} from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  hide: boolean = true;

  constructor(private authService: AuthService) {}

  authenticate(data: any){

    this.authService.login(data).then()

  }


}



