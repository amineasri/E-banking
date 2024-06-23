import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";

const routes: Routes = [

  {path:"",component:LoginComponent},
  {path:"admin",component:AdminTemplateComponent,children:[
      {path:"customers",component:CustomersComponent},
      {path:"accounts",component:AccountsComponent},
      {path:"new-customer",component:NewCustomerComponent}

    ]},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
