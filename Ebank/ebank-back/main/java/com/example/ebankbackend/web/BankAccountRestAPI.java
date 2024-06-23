package com.example.ebankbackend.web;

import com.example.ebankbackend.dtos.*;
import com.example.ebankbackend.enums.BalanceNotSufficientException;
import com.example.ebankbackend.exception.BankAccountNotFoundException;
import com.example.ebankbackend.services.BankAccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
public class BankAccountRestAPI {
private BankAccountService bankAccountService;


@GetMapping("/accounts/{accountId}")
public BankAccountDTO getBankAccount(@PathVariable Long accountId) throws BankAccountNotFoundException {
return bankAccountService.getBankAccount(accountId);
}
@GetMapping("/accounts")
    public List<BankAccountDTO> listAccounts(){
    return bankAccountService.bankAccountList();
}
@GetMapping("/operations/{id}")
    public List<AccountOperationDTO> operationDTOS(@PathVariable Long id){
    return bankAccountService.historique(id);
}
@GetMapping("account/operations/{id}")
    public AccountHistoryDTO operationHistory(@PathVariable Long id, @RequestParam(name ="page",defaultValue ="0")int page,
                                              @RequestParam(name ="size",defaultValue ="5")int size) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(id,page,size);
    }

    @PostMapping("/accounts/debit")
    public DebitDTO debit(@RequestBody DebitDTO debitDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.debit(debitDTO.getAccountId(),debitDTO.getAmount(),debitDTO.getDescription());
        return debitDTO;
}
    @PostMapping("/accounts/credit")
    public CreditDTO credit(@RequestBody CreditDTO creditDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.credit(creditDTO.getAccountId(),creditDTO.getAmount(),creditDTO.getDescription());
        return creditDTO;
    }
    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody TransferDTO creditDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.transfer(creditDTO.getAccountSource(),creditDTO.getAccountDestination(),creditDTO.getAmount());

    }
}
