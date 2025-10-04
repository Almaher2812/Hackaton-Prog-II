package com.banco.app.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @GetMapping
    public ResponseEntity<?> getAccounts(@RequestParam String user){
        List<String> cuentas = new ArrayList<>();
        if("admin".equals(user)){
            cuentas = Arrays.asList("Cuenta Admin - 5000 USD","Cuenta Admin Ahorros - 2000 USD");
        } else if("user".equals(user)){
            cuentas = Arrays.asList("Cuenta Usuario - 1500 USD","Cuenta Usuario Ahorros - 800 USD");
        }
        return ResponseEntity.ok(Map.of("accounts",cuentas));
    }
}
