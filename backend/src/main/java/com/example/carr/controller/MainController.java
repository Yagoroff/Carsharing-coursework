package com.example.carr.controller;

import com.example.carr.dto.OrderDTO;
import com.example.carr.model.Auto;
import com.example.carr.model.Orders;
import com.example.carr.model.Person;
import com.example.carr.repository.AutoRepository;
import com.example.carr.repository.PersonRepository;
import com.example.carr.service.AutoService;
import com.example.carr.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class MainController {
    private final AutoService autoService;
    private final PersonRepository personRepository;
    private final OrderService orderService;
    private final AutoRepository autoRepository;

    @GetMapping("/getPersonById/{personId}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "personId") long personId) {
        return ResponseEntity.ok(personRepository.findById(personId).get());
    }

    @GetMapping("/getAutoById/{autoId}")
    public ResponseEntity<Auto> getAutoById(@PathVariable(value = "autoId") long autoId) {
        return ResponseEntity.ok(autoRepository.findById(autoId));
    }

    @GetMapping("/getAllFreeAuto")
    public ResponseEntity<List<Auto>> getAllFreeAuto() {
        return ResponseEntity.ok(autoService.getAllFreeAuto());
    }

    @PostMapping("/newOrder")
    public ResponseEntity<?> newOrder(@RequestParam(value = "carId") Long carId, @RequestParam(value = "personId") Long personId) {
        orderService.save(new OrderDTO(1L, carId, personId));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/currentAutos/{personId}")
    public ResponseEntity<List<OrderDTO>> currentOrders(@PathVariable("personId") Long personId) {
        return ResponseEntity.ok(orderService.getAllBusyAutoByClientId(personId));
    }

    @PostMapping("/endOrder/{id}")
    public ResponseEntity<?> endOrder(@PathVariable(value = "id") long id) {
        orderService.endOrder(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/endedOrders/{personId}")
    public ResponseEntity<List<OrderDTO>> endOrders(@PathVariable("personId") Long personId) {
        return ResponseEntity.ok(orderService.getAllEndOrdersByClient(personId));
    }
}
