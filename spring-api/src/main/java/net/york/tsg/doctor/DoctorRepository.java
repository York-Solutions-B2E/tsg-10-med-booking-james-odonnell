package net.york.tsg.doctor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository
    extends JpaRepository<Doctor, Long> {
}