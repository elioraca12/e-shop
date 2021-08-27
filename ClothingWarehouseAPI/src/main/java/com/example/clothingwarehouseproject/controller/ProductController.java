package com.example.clothingwarehouseproject.controller;

import com.example.clothingwarehouseproject.domain.Product;
import com.example.clothingwarehouseproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<Product>> get(){
        return productService.getAll();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<Product> get(@PathVariable long id){
        return ResponseEntity.ok().body(productService.getProductById(id));
    }

    @GetMapping(path = "/get")
    public ResponseEntity<Product> get(@RequestParam String name){
        return ResponseEntity.ok().body(productService.getProductByName(name));
    }

    @PostMapping(path = "/post")
    public ResponseEntity<Product> save(@RequestBody Product product){
        return ResponseEntity.ok().body(productService.saveProduct(product));
    }

    @PutMapping(path = {"/update/{id}"})
    public ResponseEntity<Product> update(@PathVariable long id, @RequestBody Product product){
        return ResponseEntity.ok().body(productService.updateProductById(id,product));
    }

    @PutMapping(path = {"/update"})
    public ResponseEntity<Product> update(@RequestParam String name, @RequestBody Product product){
        return ResponseEntity.ok().body(productService.updateProductByName(name,product));
    }

    @DeleteMapping(path = {"/delete/{id}"})
    public ResponseEntity<Product> delete(@PathVariable long id){
        return ResponseEntity.ok().body(productService.deleteProductById(id));
    }

    @DeleteMapping(path = {"/delete"})
    public ResponseEntity<Product> delete(@RequestParam String name){
        return ResponseEntity.ok().body(productService.deleteProductByName(name));
    }

}
