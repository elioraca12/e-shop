import {SizeNaming} from "./size-naming";

export class Size{

   id: number
   surcharge: number
   sizeNaming: SizeNaming

  constructor() {
    this.id = 0
    this.surcharge = 0
    this.sizeNaming = new SizeNaming()
  }

}
