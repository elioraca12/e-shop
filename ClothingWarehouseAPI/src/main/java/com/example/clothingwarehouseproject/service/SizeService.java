package com.example.clothingwarehouseproject.service;

import com.example.clothingwarehouseproject.domain.Size;
import com.example.clothingwarehouseproject.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SizeService {

    private final SizeRepository sizeRepository;

    public Size getSizeById(long id){

        Size size = sizeRepository.findById(id);

        if (size == null){
            log.error("Size with {} not found", id);
        }
        else{
            log.info("Size exists");
        }
        return size;
    }


    public Size saveSize(Size size){
        sizeRepository.save(size);
        return size;
    }

    public Size deleteSizeById(long id){
        Size size = sizeRepository.findById(id);
        if (size == null){
            log.error("size don't exists");
        }
        else{
            log.info("deleting size from db");
            sizeRepository.delete(size);
        }
        return size;
    }


    public ResponseEntity<List<Size>> getAll(){
        return ResponseEntity.ok().body(sizeRepository.findAll());
    }

}
