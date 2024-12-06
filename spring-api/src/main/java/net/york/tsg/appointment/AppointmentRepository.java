package net.york.tsg.appointment;

import net.york.tsg.doctor.Doctor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository
    extends JpaRepository<Appointment, Long> {

    @NativeQuery("SELECT * FROM APPOINTMENTS WHERE DOCTOR_ID = ?1")
    List<Appointment> findAllByDoctorId(Long doctor_id);

    @NativeQuery("SELECT * FROM APPOINTMENTS WHERE PATIENT_ID = ?1")
    List<Appointment> findAllByPatientId(Long patient_id);

}