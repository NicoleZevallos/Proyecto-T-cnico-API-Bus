package com.example.bus_api.controller;

import com.example.bus_api.model.Bus;
import com.example.bus_api.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/bus")
public class BusController {
    @Autowired
    private BusRepository busRepository;

    @GetMapping
    public Page<Bus> getAllBuses(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return busRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> getBusById(@PathVariable int id){
        return busRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Bus CreateBus(@RequestBody Bus bus){
        return busRepository.save(bus);
    }
}
