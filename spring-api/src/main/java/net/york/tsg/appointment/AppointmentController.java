package net.york.tsg.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.validation.Valid;

import java.util.List;

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
		System.out.println("GET");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping(path = "{appointment_id}")
	public ResponseEntity<?> getAppointmentById(@PathVariable("appointment_id") Long appointment_id) {
		System.out.println("GET by id");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> scheduleNewAppointment(@RequestBody Appointment appointment) {
		System.out.println("POST");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping(path = "{appointment_id}")
	public ResponseEntity<?> cancelAppointment(@PathVariable(name = "appointment_id") Long appointment_id) {
		System.out.println("DELETE");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping(path = "{appointment_id}")
	public ResponseEntity<?> updateAppointment(@PathVariable(name = "appointment_id") Long appointment_id) {
		System.out.println("PUT");
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}