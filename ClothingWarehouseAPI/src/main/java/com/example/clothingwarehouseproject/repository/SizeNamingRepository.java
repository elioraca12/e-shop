package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.SizeNaming;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeNamingRepository extends JpaRepository<SizeNaming, Long> {

    SizeNaming findById(long id);

}
