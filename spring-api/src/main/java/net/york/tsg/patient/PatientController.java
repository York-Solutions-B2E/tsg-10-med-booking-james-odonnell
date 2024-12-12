package net.york.tsg.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping(path = "patients")
public class PatientController {

	private final PatientService patientService;

	@Autowired
	public PatientController(PatientService patientService) {
		this.patientService = patientService;
	}

	@GetMapping
	public ResponseEntity<?> getAllPatients() {
		return patientService.getAllPatients();
	}

	@GetMapping(path = "getinfo")
	public ResponseEntity<?> getPatientByEmail(@RequestHeader("patientEmail") String patientEmail) {
		return patientService.getPatientByEmail(patientEmail);
	}
	
	@GetMapping(path = "id")
	public ResponseEntity<?> getPatientById(@RequestHeader("patientId") Long patientId) {
		return patientService.getPatientById(patientId);
	}
	
	@PostMapping(path = "new")
	public ResponseEntity<?> addNewPatient(@Valid @RequestBody Patient patient) {
		return patientService.addNewPatient(patient);
	}
	
	@DeleteMapping
	public ResponseEntity<?> removePatientById(@RequestHeader("patientId") Long patientId) {
		return patientService.removePatientById(patientId);
	}

	@PutMapping
	public ResponseEntity<?> updatePatientInformation(@RequestBody Patient patient) {
		return patientService.updatePatientInformation(patient);
	}
	
}