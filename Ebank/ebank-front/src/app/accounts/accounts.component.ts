import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AccountsService } from "../services/accounts.service";
import { Observable } from "rxjs";
import { AccountDetails } from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountsService) { }

  ngOnInit() {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    });
  }

  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize);
  }

  gotoPage(page: any) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    console.log("Form Submitted");  // Debugging log
    console.log(this.operationFormGroup.value);  // Debugging log

    let accountId = this.accountFormGroup.value.accountId;
    let operation = this.operationFormGroup.value.operationType;
    if (operation === "CREDIT") {
      this.accountService.credit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.description).subscribe({
        next: (data: object) => {
          alert("Credit effectué");
          this.handleSearchAccount();
        },
        error: (err) => { console.log(err); }
      });
    } else if (operation === "DEBIT") {
      this.accountService.debit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.description).subscribe({
        next: (data: object) => {
          alert("Débit effectué");
          this.handleSearchAccount();
        },
        error: (err) => { console.log(err); }
      });
    } else if (operation === "TRANSFER") {
      this.accountService.transfer(accountId, this.operationFormGroup.value.accountDestination, this.operationFormGroup.value.amount, this.operationFormGroup.value.description).subscribe({
        next: (data: object) => {
          alert("Transfert effectué");
          this.handleSearchAccount();
        },
        error: (err) => { console.log(err); }
      });
    }
  }
}
