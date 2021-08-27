import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({

    $key: new FormControl(null),
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
    cost: new FormControl(0,[Validators.required, Validators.pattern(/^\d+$/)]),
    commission: new FormControl(0,[Validators.required, Validators.pattern(/^\d+$/)])

  });

  initializeFormGroup() {

    this.form.setValue({

      $key: null,
      id: 0,
      name: "",
      description: "",
      price: 0,
      cost: 0,
      commission: 0

    });

  }

  populateForm(product: Product){

    this.form.setValue({

      $key: null,
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      cost: product.cost,
      commission: product.commission

    })

  }


  getProducts(){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<Product[]>(environment.api.BASE_PRODUCT_API + environment.method.GET_ALL, {headers: headers})

  }

  addProduct(product: Product){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.post<Product>(environment.api.BASE_PRODUCT_API + environment.method.POST ,product ,{headers: headers})

  }

  editProduct(product: Product){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.put<Product>(
      environment.api.BASE_PRODUCT_API +
      environment.method.UPDATE +
      "/" +
      product.id,product,{headers: headers})

  }

  deleteProduct(product: Product){

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.delete<Product>(
      environment.api.BASE_PRODUCT_API +
      environment.method.DELETE +
      "/" +
      product.id,{headers: headers})

  }

  getProduct(productId: number) {

    let accessToken = sessionStorage.getItem("token")
    const headers = new HttpHeaders()
      .set('Authorization', "Bearer " + accessToken)
    return this.http.get<Product>(
      environment.api.BASE_PRODUCT_API +
      environment.method.GET +
      "/" +
      productId,{headers: headers})

  }

}
