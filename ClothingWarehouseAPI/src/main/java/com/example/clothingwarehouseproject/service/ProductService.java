package com.example.clothingwarehouseproject.service;

import com.example.clothingwarehouseproject.domain.Product;
import com.example.clothingwarehouseproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public Product getProductById(long id){

        Product product = productRepository.findById(id);

        if (product == null){
            log.error("Product with {} not found", id);
        }
        else{
            log.info("Product exists");
        }
        return product;
    }

    public Product getProductByName(String name){

        Product product = productRepository.findByName(name);

        if (product == null){
            log.error("Product with {} not found", name);
        }
        else{
            log.info("Product exists");
        }
        return product;
    }

    public Product saveProduct(Product product){
        productRepository.save(product);
        return product;
    }

    public Product deleteProductByName(String name){
        Product product = productRepository.findByName(name);
        if (product == null){
            log.error("product don't exists");
        }
        else{
            log.info("deleting user from db");
            productRepository.delete(product);
        }
        return product;
    }

    public Product deleteProductById(long id){
        Product product = productRepository.findById(id);
        if (product == null){
            log.error("product don't exists");
        }
        else{
            log.info("deleting product from db");
            productRepository.delete(product);
        }
        return product;
    }

    public Product updateProductById(long oldId, Product newProduct) {
        Product oldProduct = productRepository.findById(oldId);
        if (oldProduct == null) {
            log.error("product don't exists");
        } else {
            log.info("updating product on db");
            oldProduct.setName(newProduct.getName());
            oldProduct.setDescription(newProduct.getDescription());
            oldProduct.setPrice(newProduct.getPrice());
            oldProduct.setCost(newProduct.getCost());
            oldProduct.setCommission(newProduct.getCommission());
            productRepository.save(oldProduct);
        }
        return newProduct;
    }

    public Product updateProductByName(String name, Product newProduct){
        Product oldProduct = productRepository.findByName(name);
        if (oldProduct == null){
            log.error("product don't exists");
        }
        else{
            log.info("updating product on db");
            oldProduct.setName(newProduct.getName());
            oldProduct.setDescription(newProduct.getDescription());
            oldProduct.setPrice(newProduct.getPrice());
            oldProduct.setCost(newProduct.getCost());
            oldProduct.setCommission(newProduct.getCommission());
            productRepository.save(oldProduct);
        }
        return newProduct;
    }

    public ResponseEntity<List<Product>> getAll(){
        return ResponseEntity.ok().body(productRepository.findAll());
    }

}
