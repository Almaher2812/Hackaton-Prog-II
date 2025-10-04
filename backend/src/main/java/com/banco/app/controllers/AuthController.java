package com.banco.app.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> req){
        String username = req.get("username");
        String password = req.get("password");

        if("admin".equals(username) && "1234".equals(password)){
            return ResponseEntity.ok(Map.of("token","fake-jwt-admin","role","ADMIN"));
        }
        if("user".equals(username) && "abcd".equals(password)){
            return ResponseEntity.ok(Map.of("token","fake-jwt-user","role","USER"));
        }
        return ResponseEntity.status(401).body(Map.of("error","Credenciales inválidas"));
    }
}
