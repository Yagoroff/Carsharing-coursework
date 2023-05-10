package com.example.carr.controller;

import com.example.carr.dto.AuthenticationDTO;
import com.example.carr.dto.PersonDTO;
import com.example.carr.model.Person;
import com.example.carr.repository.PersonRepository;
import com.example.carr.security.JWTUtil;
import com.example.carr.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
public class AuthController {
    private final RegistrationService registrationService;
    private final JWTUtil jwtUtil;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final PersonRepository personRepository;

    @PostMapping("/registration")
    public ResponseEntity<Person> register(@RequestBody PersonDTO personDTO) {

        Person person = convertToPerson(personDTO);
        return ResponseEntity.ok(registrationService.register(person));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> performLogin(@RequestBody AuthenticationDTO authenticationDTO) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(authenticationDTO.getUsername(),
                        authenticationDTO.getPassword());
        try {
            authenticationManager.authenticate(authInputToken);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Incorrect credentials!"));
        }
        String token = jwtUtil.generateToken(authenticationDTO.getUsername(), personRepository.findByUsername(authenticationDTO.getUsername()).get().getId());
        return ResponseEntity.ok(Map.of("jwt_token", token));
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello World!");
    }

    public Person convertToPerson(PersonDTO personDTO) {
        return this.modelMapper.map(personDTO, Person.class);
    }
}
