import {Host, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  Host="http://localhost:8080";
customers:any
  constructor(private http:HttpClient) { }
  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.Host+"/customers")
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.Host+"/customers/search?keywoard="+keyword)
  }
  public saveCustomers(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(this.Host+"/customers",customer)
  }
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Host}/customers/${id}`);
  }
}
