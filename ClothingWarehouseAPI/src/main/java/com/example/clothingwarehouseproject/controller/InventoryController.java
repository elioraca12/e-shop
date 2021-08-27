package com.example.clothingwarehouseproject.controller;

import com.example.clothingwarehouseproject.domain.Inventory;
import com.example.clothingwarehouseproject.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    public final InventoryService inventoryService;

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<Inventory>> get(){
        return inventoryService.getAll();
    }

    @GetMapping(path = "/available/get")
    public ResponseEntity<List<Inventory>> getAvailableInventoryEntries(){
        return inventoryService.getAvailableInventoryEntries();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<Inventory> get(@PathVariable long id){
        return ResponseEntity.ok().body(inventoryService.getInventoryById(id));
    }

    @PostMapping(path = "/post")
    public ResponseEntity<Inventory> save(@RequestBody Inventory inventory){
        return ResponseEntity.ok().body(inventoryService.saveInventory(inventory));
    }

    @PutMapping(path = {"/update/{id}"})
    public ResponseEntity<Inventory> update(@PathVariable long id, @RequestBody Inventory inventory){
        return ResponseEntity.ok().body(inventoryService.updateInventoryById(id,inventory));
    }


    @DeleteMapping(path = {"/delete/{id}"})
    public ResponseEntity<Inventory> delete(@PathVariable long id){
        return ResponseEntity.ok().body(inventoryService.deleteInventoryById(id));
    }

}
