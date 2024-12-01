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
	
	@GetMapping(path = "id")
	public ResponseEntity<?> getPatientById(@RequestBody Patient patient) {
		return patientService.getPatientById(patient.getId());
	}
	
	@PostMapping
	public ResponseEntity<?> addNewPatient(@Valid @RequestBody Patient patient) {
		return patientService.addNewPatient(patient);
	}
	
	@DeleteMapping
	public ResponseEntity<?> removePatientById(@RequestBody Patient patient) {
		return patientService.removePatientById(patient.getId());
	}

	@PutMapping
	public ResponseEntity<?> updatePatientInformation(@RequestBody Patient patient) {
		return patientService.updatePatientInformation(patient);
	}
	
}