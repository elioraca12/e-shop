package com.example.clothingwarehouseproject.service;

import com.example.clothingwarehouseproject.domain.Transaction;
import com.example.clothingwarehouseproject.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public ResponseEntity<List<Transaction>> getAll(){
        return ResponseEntity.ok().body(transactionRepository.findAll());
    }

    public Transaction saveTransaction(Transaction transaction){
        return transactionRepository.saveAndFlush(transaction);
    }

}
