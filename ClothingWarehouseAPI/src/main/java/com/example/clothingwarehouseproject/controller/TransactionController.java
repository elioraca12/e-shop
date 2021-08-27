package com.example.clothingwarehouseproject.controller;

import com.example.clothingwarehouseproject.domain.Transaction;
import com.example.clothingwarehouseproject.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@Slf4j
@RequestMapping(path = "/api/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<Transaction>> get(){
        return transactionService.getAll();
    }

    @PostMapping(path = "/post")
    public ResponseEntity<Transaction> save(@RequestBody Transaction transaction){
        return ResponseEntity.ok().body(transactionService.saveTransaction(transaction));
    }

}
