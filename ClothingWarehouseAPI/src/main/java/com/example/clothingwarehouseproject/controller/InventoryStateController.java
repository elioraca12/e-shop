package com.example.clothingwarehouseproject.controller;

import com.example.clothingwarehouseproject.domain.InventoryState;
import com.example.clothingwarehouseproject.service.InventoryStateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/inventory-state")
@RequiredArgsConstructor
public class InventoryStateController {

    private final InventoryStateService inventoryStateService;

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<InventoryState>> get(){
        return inventoryStateService.getAll();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<InventoryState> get(@PathVariable long id){
        return ResponseEntity.ok().body(inventoryStateService.getInventoryStateById(id));
    }

    @GetMapping(path = "/get")
    public ResponseEntity<InventoryState>get(@RequestParam String name){
        return ResponseEntity.ok().body(inventoryStateService.getInventoryStateByName(name));
    }

    @PostMapping(path = "/post")
    public ResponseEntity<InventoryState> post(@RequestBody InventoryState inventoryState){
        return ResponseEntity.ok().body(inventoryStateService.saveInventoryState(inventoryState));
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<InventoryState> delete(@PathVariable long id){
        return ResponseEntity.ok().body(inventoryStateService.deleteInventoryStateById(id));
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<InventoryState> delete(@RequestParam String name){
        return ResponseEntity.ok().body(inventoryStateService.deleteInventoryStateByName(name));
    }

}
