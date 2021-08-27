package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> { }
