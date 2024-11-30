package net.york.tsg;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentRepository
    extends JpaRepository<Appointment, Long> {
}