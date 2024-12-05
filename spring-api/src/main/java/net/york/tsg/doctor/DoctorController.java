package net.york.tsg.doctor;

import net.york.tsg.specialization.Specialization;

import org.springframework.security.access.prepost.PreAuthorize;
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

	@GetMapping(path = "find")
	public ResponseEntity<?> getDoctorById(@RequestHeader("doctorId") Long doctorId) {
		return doctorService.getDoctorById(doctorId);
	}

	@GetMapping(path = "specialization")
	public ResponseEntity<?> getAllDoctorsBySpecialization(
			@RequestHeader("specializationId") Long specializationId) {
		return doctorService.getAllDoctorsBySpecialization(specializationId);
	}

	@PreAuthorize("hasAuthority('Admin')")
	@PostMapping
	public ResponseEntity<?> addNewDoctor(@Valid @RequestBody Doctor doctor) {
		return doctorService.addNewDoctor(doctor);
	}

	@PreAuthorize("hasAuthority('Admin')")
	@DeleteMapping
	public ResponseEntity<?> removeDoctor(@RequestBody Doctor doctor) {
		return doctorService.removeDoctor(doctor);
	}

	@PreAuthorize("hasAuthority('Admin')")
	@PutMapping()
	public ResponseEntity<?> updateDoctorInfo(@RequestBody Doctor doctor) {
		return doctorService.updateDoctorInfo(doctor);
	}
	
}