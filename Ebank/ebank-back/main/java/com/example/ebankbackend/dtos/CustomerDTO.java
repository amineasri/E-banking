package com.example.ebankbackend.dtos;

import com.example.ebankbackend.entities.BankAccount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.List;


@Data
public class CustomerDTO {
    private Long id;
    private String name;
    private String email;

}
