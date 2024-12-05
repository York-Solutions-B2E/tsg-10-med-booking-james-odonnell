package net.york.tsg.doctor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface DoctorRepository
    extends JpaRepository<Doctor, Long> {

    @NativeQuery("SELECT * FROM DOCTORS WHERE SPECIALIZATION_ID = ?1")
    List<Doctor> findAllBySpecialization(Long specializationId);
}