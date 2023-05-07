package com.example.carr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "auto")
@Data
@NoArgsConstructor
public class Auto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String color;
    private String mark;
    private String status;
    private String number;

    public Auto(String color, String mark, String number) {
        this.color = color;
        this.mark = mark;
        status = "free";
        this.number = number;
    }

    //@OneToMany(fetch = FetchType.LAZY, mappedBy = "auto", cascade = CascadeType.REMOVE)
    //List<Orders> orders;
}
