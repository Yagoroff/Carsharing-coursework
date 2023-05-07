package com.example.carr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutoDTO {
    private Long id;
    private String color;
    private String mark;
    private Long typeAuto;
    private String number;
}
