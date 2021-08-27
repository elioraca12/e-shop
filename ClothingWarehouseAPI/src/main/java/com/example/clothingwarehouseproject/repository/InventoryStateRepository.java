package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.InventoryState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryStateRepository extends JpaRepository<InventoryState, Long> {

    InventoryState findById(long id);
    InventoryState findByName(String name);

}
