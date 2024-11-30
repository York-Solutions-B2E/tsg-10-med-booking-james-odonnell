package net.york.tsg.appointment;

import net.york.tsg.doctor.Doctor;
import net.york.tsg.doctor.DoctorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;


@Service
public class AppointmentService {
	
	private final AppointmentRepository appointmentRepository;
	private final DoctorRepository doctorRepository;

	@Autowired
	public AppointmentService(
		AppointmentRepository appointmentRepository,
		DoctorRepository doctorRepository) {
		this.appointmentRepository = appointmentRepository;
		this.doctorRepository = doctorRepository;
	}

	public ResponseEntity<?> getAllAppointments() {
		return new ResponseEntity<>(
			appointmentRepository.findAll(),
			HttpStatus.OK);
	}

	public ResponseEntity<?> getAppointmentById(Long appointment_id) {
		Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointment_id);
		if (optionalAppointment.isEmpty())
			return new ResponseEntity<>(
				"Error: appointment_id: " + appointment_id + " not found.",
				HttpStatus.NOT_FOUND
			);
		return ResponseEntity.ok().body(optionalAppointment.get());
	}
	
	public ResponseEntity<?> getAllAppointmentsByDoctorId(Long doctor_id) {
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor_id);
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: no appointments found; doctor_id: " + doctor_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		Optional<List<Appointment>> optionalAppointments = appointmentRepository.findAllByDoctorId(doctor_id);
		if (optionalAppointments.isEmpty())
			return new ResponseEntity<>(
				"Doctor: " + doctor_id + " has no appointments scheduled.",
				HttpStatus.OK
			);

		return new ResponseEntity<>(optionalAppointments, HttpStatus.OK);
	}

	public ResponseEntity<?> scheduleNewAppointment(Appointment appointment) {
		Long doctor_id = appointment.getDoctor().getId();
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor_id);
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: could not schedule appointment; doctor_id: " + doctor_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		appointment.setDoctor(optionalDoctor.get());
		appointmentRepository.save(appointment);
		return new ResponseEntity<>(appointment, HttpStatus.OK);
	}

	public ResponseEntity<?> cancelAppointment(Long appointment_id) {
		Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointment_id);
		if (optionalAppointment.isEmpty())
			return new ResponseEntity<>(
				"Error: could not cancel appointment; appointment_id: " + appointment_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		appointmentRepository.deleteById(appointment_id);
		return new ResponseEntity<>(optionalAppointment.get(), HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> rescheduleAppointment(Long appointment_id, LocalDateTime date_time) {
		Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointment_id);
		if (optionalAppointment.isEmpty())
			return new ResponseEntity<>(
				"Error: could not reschedule appointment; appointment_id: " + appointment_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		Appointment newAppointment = Appointment.builder()
			.dateTime(date_time)
			.doctor(optionalAppointment.get().getDoctor())
			.build();

		appointmentRepository.deleteById(appointment_id);
		appointmentRepository.save(newAppointment);
		return new ResponseEntity<>(newAppointment, HttpStatus.OK);
	}

}