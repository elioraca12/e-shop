package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findById(long id);
    Product findByName(String name);

}
