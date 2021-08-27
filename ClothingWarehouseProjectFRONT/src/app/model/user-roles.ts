import {User} from "./user";
import {Role} from "./role";

export class UserRoles{

  user: User
 role: Role

  constructor() {
    this.user = new User()
    this.role = new Role()
  }

}
