package com.example.demo.controller;

import com.example.demo.service.RegistrationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    // ===============================
    // ADMIN: DOWNLOAD CSV
    // ===============================
    @GetMapping("/csv/{eventId}")
    public ResponseEntity<byte[]> downloadCsv(@PathVariable Long eventId) {

        ByteArrayInputStream csvStream =
                registrationService.generateCsvForEvent(eventId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=registrations.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvStream.readAllBytes());
    }

    // ===============================
    // ADMIN: SEND REMINDER EMAIL
    // ===============================
    @PostMapping("/reminder/{eventId}")
    public ResponseEntity<String> sendReminder(@PathVariable Long eventId) {

        registrationService.sendReminderEmails(eventId);
        return ResponseEntity.ok("Reminder emails sent successfully");
    }
}
