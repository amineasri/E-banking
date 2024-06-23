import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  Host="http://localhost:8080";

  constructor(private http:HttpClient) {}

  public getAccount(accountId: string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.Host+"/account/operations/"+accountId+"?page="+page+"&size="+size);
  }

  public debit(accountId: string,amount:number,desc:string){
    return this.http.post(this.Host+"/accounts/debit",{accountId:accountId,amount:amount,description:desc});
  }
  public credit(accountId: string,amount:number,desc:string){
    return this.http.post(this.Host+"/accounts/credit",{accountId:accountId,amount:amount,description:desc});
  }
  public transfer(accountSource: string,accountDestination: string,amount:number,desc:string){
    return this.http.post(this.Host+"/accounts/tansfer",{accountSource:accountSource,accountDestination:accountDestination,amount:amount,description:desc});
  }
}
