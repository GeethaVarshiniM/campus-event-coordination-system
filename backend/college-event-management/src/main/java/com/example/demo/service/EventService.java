package com.example.demo.service;

import com.example.demo.entity.Event;
import com.example.demo.entity.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public EventService(EventRepository eventRepository,
                        UserRepository userRepository,
                        EmailService emailService) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    // ✅ CREATE EVENT + SEND EMAIL TO ALL USERS
    public Event createEvent(Event event) {

        Event savedEvent = eventRepository.save(event);

        List<User> users = userRepository.findAll();

        for (User user : users) {
            emailService.sendEmail(
                user.getEmail(),
                "📢 New Event Added: " + savedEvent.getTitle(),
                buildEmailBody(user, savedEvent)
            );
        }

        return savedEvent;
    }

    // ✅ GET ALL EVENTS
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // ✅ GET EVENT BY ID
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // ✅ UPDATE EVENT
    public Event updateEvent(Long id, Event updatedEvent) {

        Event existingEvent = getEventById(id);

        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setDate(updatedEvent.getDate());
        existingEvent.setVenue(updatedEvent.getVenue());

        return eventRepository.save(existingEvent);
    }

    // ✅ DELETE EVENT
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // 🔒 EMAIL BODY FORMATTER
    private String buildEmailBody(User user, Event event) {
        return "Hello " + user.getName() + ",\n\n"
                + "A new event has been added to the College Event Portal.\n\n"
                + "📌 Event Details:\n"
                + "Title: " + event.getTitle() + "\n"
                + "Date: " + event.getDate() + "\n"
                + "Venue: " + event.getVenue() + "\n\n"
                + "Please login to the portal to register.\n\n"
                + "Regards,\n"
                + "College Event Management Team";
    }
}
