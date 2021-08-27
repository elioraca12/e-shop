package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Inventory findById(long id);

    @Query(value = "SELECT * FROM Inventory WHERE inventory_state_id = 1", nativeQuery = true)
    List<Inventory> getAvailableInventoryEntries();
}
