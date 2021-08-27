package com.example.clothingwarehouseproject.controller;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping(path = "/api/token")
public class JwtController {

    @PostMapping(path = "/get")
    public String decode(@RequestBody String jwtToken){
        String payload = jwtToken.split("\\.")[1];
        return new String(Base64.decodeBase64(payload), StandardCharsets.UTF_8);
    }

}
