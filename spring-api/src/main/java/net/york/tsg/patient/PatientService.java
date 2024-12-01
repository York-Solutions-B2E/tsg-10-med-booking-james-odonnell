package net.york.tsg.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Service
public class PatientService {
	
	private final PatientRepository patientRepository;

	@Autowired
	public PatientService(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}

	public ResponseEntity<?> getAllPatients() {
		return new ResponseEntity<>(
			patientRepository.findAll(),
			HttpStatus.OK);
	}

	public ResponseEntity<?> getPatientById(Long patient_id) {
		Optional<Patient> optionalPatient = patientRepository.findById(patient_id);
		if (optionalPatient.isEmpty())
			return new ResponseEntity<>(
				"Error: patient_id: " + patient_id + " not found.",
				HttpStatus.NOT_FOUND
			);
		return ResponseEntity.ok().body(optionalPatient.get());
	}

	public ResponseEntity<?> addNewPatient(Patient patient) {
		patientRepository.save(patient);
		return new ResponseEntity<>(patient, HttpStatus.OK);
	}

	public ResponseEntity<?> removePatientById(Long patient_id) {
		Optional<Patient> optionalPatient = patientRepository.findById(patient_id);
		if (optionalPatient.isEmpty())
			return new ResponseEntity<>(
				"Error: could not remove patient; patient_id: " + patient_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		patientRepository.deleteById(patient_id);
		return new ResponseEntity<>(optionalPatient.get(), HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> updatePatientInformation(Patient patient) {
		Optional<Patient> optionalPatient = patientRepository.findById(patient.getId());
		if (optionalPatient.isEmpty())
			return new ResponseEntity<>(
				"Error: could not update patient information; patient_id: " + patient.getId() + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		if (patient.getFirstName() != null && !patient.getFirstName().isEmpty())
			optionalPatient.get().setFirstName(patient.getFirstName());

		if (patient.getLastName() != null && !patient.getLastName().isEmpty())
			optionalPatient.get().setLastName(patient.getLastName());

		if (patient.getEmail() != null && !patient.getEmail().isEmpty())
			optionalPatient.get().setEmail(patient.getEmail());

		if (patient.getPhoneNumber() != null && !patient.getPhoneNumber().isEmpty())
			optionalPatient.get().setPhoneNumber(patient.getPhoneNumber());

		return new ResponseEntity<>(optionalPatient.get(), HttpStatus.OK);
	}
	
}