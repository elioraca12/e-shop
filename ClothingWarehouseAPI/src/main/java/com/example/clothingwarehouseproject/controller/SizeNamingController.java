package com.example.clothingwarehouseproject.controller;

import com.example.clothingwarehouseproject.domain.SizeNaming;
import com.example.clothingwarehouseproject.service.SizeNamingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/size-naming")
@RequiredArgsConstructor
public class SizeNamingController {

    public final SizeNamingService sizeNamingService;

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<SizeNaming>> get(){
        return sizeNamingService.getAll();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<SizeNaming> get(@PathVariable long id){
        return ResponseEntity.ok().body(sizeNamingService.getSizeNamingById(id));
    }

    @PostMapping(path = "/post")
    public ResponseEntity<SizeNaming> save(@RequestBody SizeNaming sizeNaming){
        return ResponseEntity.ok().body(sizeNamingService.saveSizeNaming(sizeNaming));
    }

    @DeleteMapping(path = {"/delete/{id}"})
    public ResponseEntity<SizeNaming> delete(@PathVariable long id){
        return ResponseEntity.ok().body(sizeNamingService.deleteSizeNamingById(id));
    }

}
