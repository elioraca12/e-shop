package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findById(long id);
    User findByUsername(String username);
    void deleteUserByUsername(String username);
    void deleteUserById(long id);
}
