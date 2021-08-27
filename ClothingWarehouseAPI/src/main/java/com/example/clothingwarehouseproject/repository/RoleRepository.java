package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

}
