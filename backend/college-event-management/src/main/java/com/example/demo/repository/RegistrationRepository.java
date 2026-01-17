package com.example.demo.repository;

import com.example.demo.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    boolean existsByEmailAndEvent_Id(String email, Long eventId);

    List<Registration> findByEvent_Id(Long eventId);
}
