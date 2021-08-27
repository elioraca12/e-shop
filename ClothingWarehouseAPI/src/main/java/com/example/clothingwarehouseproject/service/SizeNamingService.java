package com.example.clothingwarehouseproject.service;

import com.example.clothingwarehouseproject.domain.SizeNaming;
import com.example.clothingwarehouseproject.repository.SizeNamingRepository;
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
public class SizeNamingService {


    private final SizeNamingRepository sizeNamingRepository;

    public SizeNaming getSizeNamingById(long id){

        SizeNaming sizeNaming = sizeNamingRepository.findById(id);

        if (sizeNaming == null){
            log.error("Size naming with {} not found", id);
        }
        else{
            log.info("Size naming exists");
        }
        return sizeNaming;
    }


    public SizeNaming saveSizeNaming(SizeNaming sizeNaming){
        sizeNamingRepository.save(sizeNaming);
        return sizeNaming;
    }

    public SizeNaming deleteSizeNamingById(long id){
        SizeNaming sizeNaming = sizeNamingRepository.findById(id);
        if (sizeNaming == null){
            log.error("size don't exists");
        }
        else{
            log.info("deleting size from db");
            sizeNamingRepository.delete(sizeNaming);
        }
        return sizeNaming;
    }


    public ResponseEntity<List<SizeNaming>> getAll(){
        return ResponseEntity.ok().body(sizeNamingRepository.findAll());
    }

}
