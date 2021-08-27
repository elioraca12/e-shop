package com.example.clothingwarehouseproject.controller;

import com.example.clothingwarehouseproject.domain.User;
import com.example.clothingwarehouseproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = {"/api/user"})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(path = {"/get/{id}"})
    public ResponseEntity<User> get(@PathVariable long id){
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @GetMapping(path = {"/get"})
    public ResponseEntity<User> get(@RequestParam String username){
        return ResponseEntity.ok().body(userService.getUserByUsername(username));
    }

    @PostMapping(path = {"/post"})
    public ResponseEntity<User> save(@RequestBody User user){
        if (userService.getUserByUsername(user.getUsername()) != null){
            return ResponseEntity.badRequest().body(new User());
        }
        else{
            return ResponseEntity.ok().body(userService.saveUser(user));
        }

    }

    @PutMapping(path = {"/update/{id}"})
    public ResponseEntity<User> update(@PathVariable long id, @RequestBody User user){
        return ResponseEntity.ok().body(userService.updateUserById(id,user));
    }

    @PutMapping(path = {"/update"})
    public ResponseEntity<User> update(@RequestParam String username, @RequestBody User user){
        return ResponseEntity.ok().body(userService.updateUserByUsername(username,user));
    }

    @DeleteMapping(path = {"/delete/{id}"})
    public ResponseEntity<User> delete(@PathVariable long id){
        return ResponseEntity.ok().body(userService.deleteUserById(id));
    }

    @DeleteMapping(path = {"/delete"})
    public ResponseEntity<User> delete(@RequestParam String username){
        return ResponseEntity.ok().body(userService.deleteUserByUsername(username));
    }

}
