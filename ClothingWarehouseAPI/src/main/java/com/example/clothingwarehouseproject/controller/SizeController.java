package com.example.clothingwarehouseproject.controller;

import com.example.clothingwarehouseproject.domain.Size;
import com.example.clothingwarehouseproject.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/size")
@RequiredArgsConstructor
public class SizeController {

    public final SizeService sizeService;

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<Size>> get(){
        return sizeService.getAll();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<Size> get(@PathVariable long id){
        return ResponseEntity.ok().body(sizeService.getSizeById(id));
    }

    @PostMapping(path = "/post")
    public ResponseEntity<Size> save(@RequestBody Size size){
        return ResponseEntity.ok().body(sizeService.saveSize(size));
    }

    @DeleteMapping(path = {"/delete/{id}"})
    public ResponseEntity<Size> delete(@PathVariable long id){
        return ResponseEntity.ok().body(sizeService.deleteSizeById(id));
    }

}
