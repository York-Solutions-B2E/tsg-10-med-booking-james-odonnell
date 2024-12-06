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
	public ResponseEntity<?> getAllAppointmentsByDoctor(@RequestHeader("doctorId") Long doctorId) {
		return appointmentService.getAllAppointmentsByDoctor(doctorId);
	}

	@GetMapping(path = "patient")
	public ResponseEntity<?> getAllAppointmentsByPatientEmail(@RequestHeader("patientEmail") String email) {
		return appointmentService.getAllAppointmentsByPatientEmail(email);
	}

	@PostMapping
	public ResponseEntity<?> scheduleNewAppointment(@Valid @RequestBody Appointment appointment) {
		return appointmentService.scheduleNewAppointment(appointment);
	}

	@PutMapping
	public ResponseEntity<?> updateAppointment(@RequestBody Appointment appointment) {
		return appointmentService.updateAppointment(appointment);
	}
	
}