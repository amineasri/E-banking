package com.example.ebankbackend.web;

import com.example.ebankbackend.dtos.CustomerDTO;
import com.example.ebankbackend.entities.Customer;
import com.example.ebankbackend.services.BankAccountService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
public class CustomerRestController {
     private BankAccountService bankAccountService;

    @PreAuthorize("hasAuthority('SCOPE_USER')")
     @GetMapping("/customers")
     public List<CustomerDTO> customers(){
         return bankAccountService.listCustomer();
     }

    @PreAuthorize("hasAuthority('SCOPE_USER')")
     @GetMapping("/customers/search")
    public List<CustomerDTO> searchcustomers(@RequestParam(name = "keywoard",defaultValue = "") String keywoard){
        System.out.println("Searching customers with keyword: " + keywoard);
        String sanitizedKeyword = keywoard.replaceAll("[\\\\]", "");
        return  bankAccountService.searchCustomers(sanitizedKeyword);
    }


    @PreAuthorize("hasAuthority('SCOPE_USER')")
     @GetMapping("/customer/{id}")
     public CustomerDTO customer(@PathVariable Long id){
         return bankAccountService.getCustomer(id);

     }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
     @PostMapping("/customers")
    public Customer saveCustomer(@RequestBody CustomerDTO customerDTO){
        return bankAccountService.saveCustomer(customerDTO);
     }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @PutMapping("customers/{id}")
    public Customer updateCustomer(@PathVariable Long id,@RequestBody CustomerDTO customerDTO){
         customerDTO.setId(id);
         return bankAccountService.updateCustomer(customerDTO);
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @DeleteMapping("/customers/{id}")
    public void deleteCustomer(@PathVariable Long id){
         bankAccountService.deleteCustomer(id);
    }
}
