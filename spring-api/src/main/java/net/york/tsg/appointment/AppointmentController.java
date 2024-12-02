package net.york.tsg.appointment;

import net.york.tsg.doctor.Doctor;
import net.york.tsg.patient.Patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.validation.Valid;

import java.time.LocalDateTime;

@RestController
@RequestMapping(path = "appointments")
public class AppointmentController {

	private final AppointmentService appointmentService;

	@Autowired
	public AppointmentController(AppointmentService appointmentService) {
		this.appointmentService = appointmentService;
	}

	@GetMapping
	public ResponseEntity<?> getAllAppointments() {
		return appointmentService.getAllAppointments();
	}

	@GetMapping(path = "find")
	public ResponseEntity<?> getAppointmentById(@RequestBody Appointment appointment) {
		return appointmentService.getAppointmentById(appointment);
	}

	@GetMapping(path = "doctor")
	public ResponseEntity<?> getAllAppointmentsByDoctor(@RequestBody Doctor doctor) {
		return appointmentService.getAllAppointmentsByDoctor(doctor);
	}

	@GetMapping(path = "patient")
	public ResponseEntity<?> getAllAppointmentsByPatient(@RequestBody Patient patient) {
		return appointmentService.getAllAppointmentsByPatient(patient);
	}

	@PostMapping
	public ResponseEntity<?> scheduleNewAppointment(@Valid @RequestBody Appointment appointment) {
		return appointmentService.scheduleNewAppointment(appointment);
	}

	@DeleteMapping
	public ResponseEntity<?> cancelAppointment(@RequestBody Appointment appointment) {
		return appointmentService.cancelAppointment(appointment);
	}

	@PutMapping
	public ResponseEntity<?> updateAppointment(@RequestBody Appointment appointment) {
		return appointmentService.updateAppointment(appointment);
	}
	
}