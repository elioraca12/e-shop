package com.example.clothingwarehouseproject.controller;


import com.example.clothingwarehouseproject.domain.Role;
import com.example.clothingwarehouseproject.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<Role>> getAll(){
        return roleService.getAll();
    }

    @GetMapping(path = "/get")
    public ResponseEntity<Role> get(@RequestParam String name){
        return roleService.getRole(name);
    }

}
