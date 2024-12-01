package net.york.tsg.appointment;

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

	@GetMapping(path = "{appointment_id}")
	public ResponseEntity<?> getAppointmentById(@PathVariable("appointment_id") Long appointment_id) {
		return appointmentService.getAppointmentById(appointment_id);
	}

	@GetMapping(path = "doctor/{doctor_id}")
	public ResponseEntity<?> getAllAppointmentsByDoctorId(@PathVariable("doctor_id") Long doctor_id) {
		return appointmentService.getAllAppointmentsByDoctorId(doctor_id);
	}

	@GetMapping(path = "patient/{patient_id}")
	public ResponseEntity<?> getAllAppointmentsByPatientId(@PathVariable("patient_id") Long patient_id) {
		return appointmentService.getAllAppointmentsByPatientId(patient_id);
	}

	@PostMapping
	public ResponseEntity<?> scheduleNewAppointment(@Valid @RequestBody Appointment appointment) {
		return appointmentService.scheduleNewAppointment(appointment);
	}

	@DeleteMapping(path = "{appointment_id}")
	public ResponseEntity<?> cancelAppointment(@PathVariable(name = "appointment_id") Long appointment_id) {
		return appointmentService.cancelAppointment(appointment_id);
	}

	@PutMapping(path = "reschedule/{appointment_id}")
	public ResponseEntity<?> rescheduleAppointment(
		@PathVariable(name = "appointment_id") Long appointment_id,
		@RequestBody LocalDateTime date_time) {
		return appointmentService.rescheduleAppointment(appointment_id, date_time);
	}
	
}