package com.example.carr.service;

import com.example.carr.model.Auto;
import com.example.carr.repository.AutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AutoService {
    private final AutoRepository autoRepository;

    public List<Auto> getAll() {
        return autoRepository.findAll();
    }

    public Auto findById(Long id) {
        return autoRepository.findById(id).get();
    }

    public List<Auto> getAllFreeAuto() {
        return autoRepository.findAll().stream().filter(a -> a.getStatus().equals("free")).collect(Collectors.toList());
    }

}
