package com.example.clothingwarehouseproject.service;

import com.example.clothingwarehouseproject.domain.InventoryState;
import com.example.clothingwarehouseproject.repository.InventoryStateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InventoryStateService {

    private final InventoryStateRepository inventoryStateRepository;

    public InventoryState getInventoryStateById(long id){

        InventoryState inventoryState = inventoryStateRepository.findById(id);

        if (inventoryState == null){
            log.error("State with {} not found", id);
        }
        else{
            log.info("State exists");
        }

        return inventoryState;

    }

    public InventoryState getInventoryStateByName(String name){

        InventoryState inventoryState = inventoryStateRepository.findByName(name);

        if (inventoryState == null){
            log.error("State with {} not found", name);
        }
        else{
            log.info("State exists");
        }
        return inventoryState;
    }

    public InventoryState saveInventoryState(InventoryState inventoryState){
        inventoryStateRepository.save(inventoryState);
        return inventoryState;
    }

    public InventoryState deleteInventoryStateByName(String name){
        InventoryState inventoryState = inventoryStateRepository.findByName(name);
        if (inventoryState == null){
            log.error("state don't exists");
        }
        else{
            log.info("deleting state from db");
            inventoryStateRepository.delete(inventoryState);
        }
        return inventoryState;
    }

    public InventoryState deleteInventoryStateById(long id){
        InventoryState inventoryState = inventoryStateRepository.findById(id);
        if (inventoryState == null){
            log.error("state don't exists");
        }
        else{
            log.info("deleting state from db");
            inventoryStateRepository.delete(inventoryState);
        }
        return inventoryState;
    }

    public ResponseEntity<List<InventoryState>> getAll(){
        return ResponseEntity.ok().body(inventoryStateRepository.findAll());
    }

}
