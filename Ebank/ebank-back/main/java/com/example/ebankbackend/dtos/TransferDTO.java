package com.example.ebankbackend.dtos;

import lombok.Data;

@Data
public class TransferDTO {
    private Long accountSource;

    private Long accountDestination;
    private double amount;

    private String description;
}
