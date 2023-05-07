package com.example.carr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long autoId;
    private Long personId;
    private String dateTaking;
    private String dateReturn;

    public OrderDTO(Long id, Long autoId, Long personId) {
        this.id = id;
        this.autoId = autoId;
        this.personId = personId;
    }
}
