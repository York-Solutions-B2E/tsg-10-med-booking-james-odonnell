package net.york.tsg.doctor;

import net.york.tsg.specialization.Specialization;

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
	public ResponseEntity<?> getDoctorById(@RequestBody Doctor doctor) {
		return doctorService.getDoctorById(doctor);
	}

	@PostMapping
	public ResponseEntity<?> addNewDoctor(@Valid @RequestBody Doctor doctor) {
		return doctorService.addNewDoctor(doctor);
	}

	@DeleteMapping
	public ResponseEntity<?> removeDoctor(@RequestBody Doctor doctor) {
		return doctorService.removeDoctor(doctor);
	}

	@PutMapping()
	public ResponseEntity<?> updateDoctorInfo(@RequestBody Doctor doctor) {
		return doctorService.updateDoctorInfo(doctor);
	}
	
}