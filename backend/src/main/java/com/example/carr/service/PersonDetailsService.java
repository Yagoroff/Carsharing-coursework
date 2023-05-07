package com.example.carr.service;

import com.example.carr.exception.PersonNotFoundException;
import com.example.carr.model.Person;
import com.example.carr.repository.PersonRepository;
import com.example.carr.security.PersonDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonDetailsService implements UserDetailsService {
    private final PersonRepository personRepository;
    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<Person> person = personRepository.findByUsername(username);

        if (person.isEmpty())
            throw new PersonNotFoundException();

        return new PersonDetails(person.get());
    }
}
