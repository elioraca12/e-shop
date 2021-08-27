package com.example.clothingwarehouseproject.repository;

import com.example.clothingwarehouseproject.domain.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size, Long> {

    Size findById(long id);

}
