package com.example.ebankbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import jakarta.persistence.*;

@Data @NoArgsConstructor @AllArgsConstructor
@Entity
@DiscriminatorValue("SA")
public class SavingAccount extends  BankAccount{
    private Double interestRate;
}
