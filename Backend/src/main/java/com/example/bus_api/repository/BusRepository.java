package com.example.bus_api.repository;

import com.example.bus_api.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

public interface BusRepository extends JpaRepository<Bus, Integer> {
    Page<Bus> findAll(Pageable pageable);
}
