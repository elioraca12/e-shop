package com.example.clothingwarehouseproject.service;


import com.example.clothingwarehouseproject.domain.Inventory;
import com.example.clothingwarehouseproject.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public Inventory getInventoryById(long id){

        Inventory inventory = inventoryRepository.findById(id);

        if (inventory == null){
            log.error("Inventory with {} not found", id);
        }
        else{
            log.info("Inventory exists");
        }
        return inventory;
    }


    public Inventory saveInventory(Inventory inventory){
        inventoryRepository.save(inventory);
        return inventory;
    }

    public Inventory deleteInventoryById(long id){
        Inventory inventory = inventoryRepository.findById(id);
        if (inventory == null){
            log.error("inventory don't exists");
        }
        else{
            log.info("deleting inventory from db");
            inventoryRepository.delete(inventory);
        }
        return inventory;
    }

    public Inventory updateInventoryById(long oldId, Inventory newInventory) {
        Inventory oldInventory = inventoryRepository.findById(oldId);
        if (oldInventory == null) {
            log.error("inventory don't exists");
        } else {
            log.info("updating inventory on db");
            oldInventory.setInventoryState(newInventory.getInventoryState());
            oldInventory.setQuantity(newInventory.getQuantity());
            oldInventory.setProduct(newInventory.getProduct());
            oldInventory.setSize(newInventory.getSize());
            oldInventory.setSoldPrice(newInventory.getSoldPrice());
            oldInventory.setSoldDate(newInventory.getSoldDate());
            inventoryRepository.save(oldInventory);
        }
        return newInventory;
    }


    public ResponseEntity<List<Inventory>> getAll(){
        return ResponseEntity.ok().body(inventoryRepository.findAll());
    }

    public ResponseEntity<List<Inventory>> getAvailableInventoryEntries(){
        return ResponseEntity.ok().body(inventoryRepository.getAvailableInventoryEntries());
    }

}
