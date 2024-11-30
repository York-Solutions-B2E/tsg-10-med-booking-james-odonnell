package net.york.tsg.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

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
	
	@GetMapping(path = "{patient_id}")
	public ResponseEntity<?> getPatientById(@PathVariable("patient_id") Long patient_id) {
		return patientService.getPatientById(patient_id);
	}
	
	@PostMapping
	public ResponseEntity<?> addNewPatient(@Valid @RequestBody Patient patient) {
		return patientService.addNewPatient(patient);
	}
	
	@DeleteMapping(path = "{patient_id}")
	public ResponseEntity<?> removePatientById(@PathVariable("patient_id") Long patient_id) {
		return patientService.removePatientById(patient_id);
	}

	@PutMapping(path = "{patient_id}")
	public ResponseEntity<?> updatePatientInformation(
		@PathVariable("patient_id") Long patient_id,
		@RequestParam(required = false) String first_name,
		@RequestParam(required = false) String last_name,
		@RequestParam(required = false) String email,
		@RequestParam(required = false) String phone_number) {
		return patientService.updatePatientInformation(patient_id, first_name, last_name, email, phone_number);
	}
	
}