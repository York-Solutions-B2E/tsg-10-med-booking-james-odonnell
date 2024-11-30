package net.york.tsg.doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping(path = "doctors")
public class DoctorController {

	private final DoctorService doctorService;

	@Autowired
	public DoctorController(DoctorService doctorService) {
		this.doctorService = doctorService;
	}

	@GetMapping
	public ResponseEntity<?> getDoctors() {
		System.out.println("GET");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> addNewDoctor(@RequestBody Doctor doctor) {
		System.out.println("POST");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping(path = "{doctor_id}")
	public ResponseEntity<?> deleteDoctor(@PathVariable("doctor_id") Long id) {
		System.out.println("DELETE");
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}