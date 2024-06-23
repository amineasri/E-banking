import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!:Observable<Array<Customer>>;
  errors:string|undefined;
  searchformGroup!:FormGroup;
constructor(private customerService : CustomerService,private fb:FormBuilder,private router:Router) {
}
ngOnInit() {
  this.searchformGroup=this.fb.group({
    keyword:this.fb.control("")
  });
this.customers=this.customerService.getCustomers().pipe(catchError(err => {
  console.log(this.customers);
  this.errors=err.message;
  return throwError(err);
}));
}

  handleSearchCustomers() {
  let kw=this.searchformGroup?.value.keyword;
  this.customers=this.customerService.searchCustomers(kw).pipe(catchError(err => {
    console.log(this.customers);
    this.errors=err.message;
    return throwError(err);
  }));

  }

  handleDeleteCustomer(customer: Customer) {
    const conf = confirm("Are you sure?");
    if (conf) {
      this.customerService.deleteCustomer(customer.id).subscribe({
        next: () => {
          alert('Customer deleted successfully');

        },
        error: err => {
          console.error('Error deleting customer', err);
        }
      });
    }
  }
}
