package net.york.tsg.doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

	private final DoctorRepository doctorRepository;

	@Autowired
	public DoctorService(DoctorRepository doctorRepository) {
		this.doctorRepository = doctorRepository;
	}

	public ResponseEntity<?> getDoctors() {
		return new ResponseEntity<>(
			doctorRepository.findAll(), HttpStatus.OK);
	}

	public ResponseEntity<?> getDoctorById(Long doctorId) {
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: doctorId: " + doctorId + " not found.",
				HttpStatus.NOT_FOUND
			);
		return ResponseEntity.ok().body(optionalDoctor.get());
	}

	public ResponseEntity<?> addNewDoctor(Doctor doctor) {
		doctorRepository.save(doctor);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<?> deleteDoctor(Long doctorId) {
		if (doctorRepository.findById(doctorId).isEmpty())
			return new ResponseEntity<>(
				"Error: doctorId: " + doctorId + " not found.",
				HttpStatus.NOT_FOUND
			);

		doctorRepository.deleteById(doctorId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> updateDoctorInfo(
		Long doctorId,
		String firstName,
		String lastName,
		String specialization) {
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
		if (doctorRepository.findById(doctorId).isEmpty())
			return new ResponseEntity<>(
				"Error: doctorId: " + doctorId + " not found.",
				HttpStatus.NOT_FOUND
			);

		if (firstName != null && !firstName.isEmpty())
			optionalDoctor.get().setFirstName(firstName);

		if (lastName != null && !lastName.isEmpty())
			optionalDoctor.get().setLastName(lastName);

		if (specialization != null && !specialization.isEmpty())
			optionalDoctor.get().setSpecialization(specialization);

		return new ResponseEntity<>(optionalDoctor.get(), HttpStatus.OK);
	}

}