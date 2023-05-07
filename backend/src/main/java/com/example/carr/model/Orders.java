package com.example.carr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dateTaking;
    private String dateReturn;

    @ManyToOne(fetch = FetchType.LAZY)
    private Auto auto;

    @ManyToOne(fetch = FetchType.LAZY)
    private Person person;
    public Orders(String dateTaking, String dateReturn, Auto auto, Person person) {
        this.dateTaking = dateTaking;
        this.dateReturn = dateReturn;
        this.auto = auto;
        this.person = person;
    }

    @JsonIgnore
    public boolean isDateReturnEmpty() {
        return dateReturn == null;
    }
}
