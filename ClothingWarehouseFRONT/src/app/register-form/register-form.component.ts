import {Component, Injectable} from '@angular/core';
import {UserService} from "../service/user.service";
import {DeliveryService} from "../service/delivery.service";
import {RoleService} from "../service/role.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
@Injectable()
export class RegisterFormComponent {

  hide: boolean = true;

  constructor(

    public userService: UserService,
    private roleService: RoleService,
    private deliveryService: DeliveryService

  ){

    this.userService.form.reset()

  }

  onClear() {
    this.userService.initializeFormGroup();
    this.userService.form.reset();
  }

  async onSubmit() {

    if (this.userService.form.valid) {

      await this.userService.addUser(this.userService.form.value).pipe().toPromise()
      this.onClear()
      this.deliveryService.refresh()

    }

  }

}



