package net.york.tsg.doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping(path = "doctors")
public class DoctorController {

	private final DoctorService doctorService;

	@Autowired
	public DoctorController(DoctorService doctorService) {
		this.doctorService = doctorService;
	}

	@GetMapping
	public ResponseEntity<?> getAllDoctors() {
		return doctorService.getAllDoctors();
	}

	@GetMapping(path = "{doctor_id}")
	public ResponseEntity<?> getDoctorById(@PathVariable("doctor_id") Long doctorId) {
		return doctorService.getDoctorById(doctorId);
	}

	@PostMapping
	public ResponseEntity<?> addNewDoctor(@Valid @RequestBody Doctor doctor) {
		return doctorService.addNewDoctor(doctor);
	}

	@DeleteMapping(path = "{doctor_id}")
	public ResponseEntity<?> removeDoctor(@PathVariable("doctor_id") Long doctorId) {
		return doctorService.removeDoctor(doctorId);
	}

	@PutMapping(path = "{doctor_id}")
	public ResponseEntity<?> updateDoctorInfo(
		@PathVariable("doctor_id") Long doctorId,
		@RequestParam(required = false) String firstName,
		@RequestParam(required = false) String lastName,
		@RequestParam(required = false) String specialization) {
		return doctorService.updateDoctorInfo(doctorId, firstName, lastName, specialization);
	}
	
}