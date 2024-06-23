export interface AccountDetails {
  accountId:     number;
  balance:       number;
  currentPage:   number;
  totalPages:    number;
  pageSize:      number;
  operationDTOS: AccountOperation[];
}

export interface AccountOperation{
  id:number;
  operationDate:Date;
  amount:number;
  type:string;
  description:string;
}
