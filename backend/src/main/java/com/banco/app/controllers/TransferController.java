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
@RequestMapping("/api/transfer")
public class TransferController {

    @PostMapping
    public ResponseEntity<?> transfer(@RequestBody Map<String, Object> req) {
        try {
            String from = req.get("from").toString();
            String to = req.get("to").toString();

            // ✅ Convierte sin importar si viene como Integer, Double o String
            double amountRaw = Double.parseDouble(req.get("amount").toString());
            int amount = (int) amountRaw;

            if (amount <= 0) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "Monto inválido"
                ));
            }

            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "💸 Transferencia exitosa",
                    "details", "Se transfirieron " + amount + " de " + from + " a " + to
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Error procesando la transferencia: " + e.getMessage()
            ));
        }
    }
}
