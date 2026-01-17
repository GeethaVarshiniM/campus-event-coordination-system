package com.example.demo.service;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final EmailService emailService;

    // ===============================
    // CONSTRUCTOR INJECTION
    // ===============================
    public RegistrationService(RegistrationRepository registrationRepository,
                               EventRepository eventRepository,
                               EmailService emailService) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
        this.emailService = emailService;
    }

    // ===============================
    // STUDENT REGISTER FOR EVENT
    // ===============================
    public Registration saveRegistration(Long eventId, User user) {

        boolean alreadyRegistered =
                registrationRepository.existsByEmailAndEvent_Id(
                        user.getEmail(), eventId);

        if (alreadyRegistered) {
            throw new RuntimeException("Already registered for this event");
        }

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Registration registration = new Registration();
        registration.setEmail(user.getEmail());
        registration.setRegNumber(user.getRegNumber());
        registration.setDepartment(user.getDepartment());
        registration.setPhone(user.getPhone());
        registration.setEvent(event);

        return registrationRepository.save(registration);
    }

    // ===============================
    // CHECK IF ALREADY REGISTERED
    // ===============================
    public boolean isAlreadyRegistered(String email, Long eventId) {
        return registrationRepository.existsByEmailAndEvent_Id(email, eventId);
    }

    // ===============================
    // ADMIN: GET REGISTRATIONS BY EVENT
    // ===============================
    public List<Registration> getRegistrationsByEvent(Long eventId) {
        return registrationRepository.findByEvent_Id(eventId);
    }

    // ===============================
    // ADMIN: DOWNLOAD CSV
    // ===============================
    public ByteArrayInputStream generateCsvForEvent(Long eventId) {

        List<Registration> registrations =
                registrationRepository.findByEvent_Id(eventId);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(out);

        // CSV Header
        writer.println("Email,Register Number,Department,Phone");

        for (Registration r : registrations) {
            writer.println(
                    r.getEmail() + "," +
                    r.getRegNumber() + "," +
                    r.getDepartment() + "," +
                    r.getPhone()
            );
        }

        writer.flush();
        return new ByteArrayInputStream(out.toByteArray());
    }

    // ===============================
    // ADMIN: SEND REMINDER EMAILS
    // ===============================
    public void sendReminderEmails(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<Registration> registrations =
                registrationRepository.findByEvent_Id(eventId);

        for (Registration r : registrations) {

            String message =
                    "Dear Student,\n\n" +
                    "This is a reminder for the upcoming event.\n\n" +
                    "Event: " + event.getTitle() + "\n" +
                    "Date: " + event.getDate() + "\n" +
                    "Venue: " + event.getVenue() + "\n\n" +
                    "Please be on time.\n\n" +
                    "Regards,\nCollege Event Management Team";

            emailService.sendEmail(
                    r.getEmail(),
                    "Reminder: " + event.getTitle(),
                    message
            );
        }
    }
}
