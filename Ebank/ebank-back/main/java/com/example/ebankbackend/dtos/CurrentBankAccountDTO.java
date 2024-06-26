package com.example.ebankbackend.dtos;

import com.example.ebankbackend.entities.BankAccount;
import com.example.ebankbackend.enums.AccountStatus;
import lombok.Data;

import java.util.Date;

@Data
public class CurrentBankAccountDTO extends BankAccountDTO {

    private Long id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDTO customerDTO;
    private Double overDraft;
}
