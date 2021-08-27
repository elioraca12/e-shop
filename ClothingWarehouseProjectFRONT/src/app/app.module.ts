import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {LoginRegisterMergedComponent} from './login-register-merged/login-register-merged.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {ProductShowComponent} from './product-show/product-show.component';
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NewsShowComponent} from './news-show/news-show.component';
import {TransactionShowComponent} from './transaction-show/transaction-show.component';
import {InventoryShowComponent} from './inventory-show/inventory-show.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AddProductFormComponent} from './add-product-form/add-product-form.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { UpdateProductFormComponent } from './update-product-form/update-product-form.component';
import { OrderShowComponent } from './order-show/order-show.component';
import {MatSliderModule} from "@angular/material/slider";
import { CheckoutComponent } from './checkout/checkout.component';
import {A11yModule} from "@angular/cdk/a11y";
import {NgxPrintModule} from "ngx-print";
import { AddInventoryFormComponent } from './add-inventory-form/add-inventory-form.component';
import { UpdateInventoryFormComponent } from './update-inventory-form/update-inventory-form.component';
import {MatNativeDateModule} from "@angular/material/core";
import {IsAuthenticatedGuard} from "./service/is-authenticated.guard";
import {HasRoleGuard} from "./service/has-role.guard";



const routes = [
  { path: '', component: LoginRegisterMergedComponent },
  { path: 'dashboard', canActivate: [IsAuthenticatedGuard], component: DashboardComponent, children: [
      { path: 'news', canActivate: [IsAuthenticatedGuard], component: NewsShowComponent},
      { path: 'products', canActivate: [IsAuthenticatedGuard], component: ProductShowComponent, data: {role : "ROLE_SUPER_ADMIN"} },
      { path: 'inventory', canActivate: [IsAuthenticatedGuard, HasRoleGuard], component: InventoryShowComponent, data: {role : "ROLE_SUPER_ADMIN"}},
      { path: 'transactions', canActivate: [IsAuthenticatedGuard, HasRoleGuard], component: TransactionShowComponent, data: {role : "ROLE_SUPER_ADMIN"}},
      { path: 'order', canActivate: [IsAuthenticatedGuard, HasRoleGuard], component: OrderShowComponent, data: {role : "ROLE_USER"}}
    ]},
  { path: 'checkout',canActivate: [IsAuthenticatedGuard, HasRoleGuard], component: CheckoutComponent, data: {role : "ROLE_USER"}},
];
@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterMergedComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ProductShowComponent,
    DashboardComponent,
    NewsShowComponent,
    TransactionShowComponent,
    InventoryShowComponent,
    AddProductFormComponent,
    UpdateProductFormComponent,
    OrderShowComponent,
    CheckoutComponent,
    AddInventoryFormComponent,
    UpdateInventoryFormComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatSidenavModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    A11yModule,
    NgxPrintModule,
    MatNativeDateModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddProductFormComponent,UpdateProductFormComponent, AddInventoryFormComponent, UpdateInventoryFormComponent]
})


export class AppModule {
}
