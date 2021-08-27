package com.example.clothingwarehouseproject;

import com.example.clothingwarehouseproject.domain.Product;
import com.example.clothingwarehouseproject.domain.Role;
import com.example.clothingwarehouseproject.domain.User;
import com.example.clothingwarehouseproject.service.ProductService;
import com.example.clothingwarehouseproject.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class ClothingWarehouseProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClothingWarehouseProjectApplication.class, args);
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
