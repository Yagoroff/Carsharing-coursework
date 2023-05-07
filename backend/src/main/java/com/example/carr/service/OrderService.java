package com.example.carr.service;

import com.example.carr.dto.OrderDTO;
import com.example.carr.model.Auto;
import com.example.carr.model.Orders;
import com.example.carr.repository.AutoRepository;
import com.example.carr.repository.OrderRepository;
import com.example.carr.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final AutoRepository autoRepository;
    private final OrderRepository orderRepository;
    private final PersonRepository personRepository;


    public void save(OrderDTO orderDto) {
        Orders order = new Orders(
                LocalDateTime.now().toString(),
                null,
                autoRepository.findById(orderDto.getAutoId()).get(),
                personRepository.findById(orderDto.getPersonId()).get()
        );
        Auto auto = autoRepository.findById(orderDto.getAutoId()).get();
        auto.setStatus("busy");
        autoRepository.save(auto);
        orderRepository.save(order);
    }

    public List<OrderDTO> getAllBusyAutoByClientId(Long personId) {
        List<OrderDTO> list = orderRepository
                .findAll()
                .stream()
                .filter(o -> o.getAuto().getStatus().equals("busy"))
                .filter(o -> o.getPerson().getId().equals(personId))
                .filter(Orders::isDateReturnEmpty)
                .map(orders -> new OrderDTO(orders.getId(), orders.getAuto().getId(), orders.getPerson().getId(), orders.getDateTaking(), null))
                .toList();
        System.out.println(list);
        return list;
    }

    public List<OrderDTO> getAllEndOrdersByClient(Long personId) {
        return orderRepository
                .findAll()
                .stream()
                .filter(o -> o.getPerson().getId().equals(personId))
                .filter(o -> !o.isDateReturnEmpty())
                .map(o -> new OrderDTO(o.getId(), o.getAuto().getId(), o.getPerson().getId(), o.getDateTaking(), o.getDateReturn()))
                .toList();
    }

    public void endOrder(long id) {
        Orders order = orderRepository.findOrdersById(id);
        Auto auto = order.getAuto();
        auto.setStatus("free");
        autoRepository.save(auto);
        order.setDateReturn(LocalDateTime.now().toString());
        orderRepository.save(order);
    }
}

