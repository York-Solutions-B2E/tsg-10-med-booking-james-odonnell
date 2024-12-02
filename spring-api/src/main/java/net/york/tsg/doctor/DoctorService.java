package net.york.tsg.doctor;

import net.york.tsg.specialization.Specialization;
import net.york.tsg.specialization.SpecializationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Service
public class DoctorService {

	private final DoctorRepository doctorRepository;
	private final SpecializationService specializationService;

	@Autowired
	public DoctorService(DoctorRepository doctorRepository, SpecializationService specializationService) {
		this.doctorRepository = doctorRepository;
		this.specializationService = specializationService;
	}

	public ResponseEntity<?> getAllDoctors() {
		return new ResponseEntity<>(
			doctorRepository.findAll(), HttpStatus.OK);
	}

	public ResponseEntity<?> getDoctorById(Long doctor_id) {
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor_id);
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: doctor_id: " + doctor_id + " not found.",
				HttpStatus.NOT_FOUND
			);
		return ResponseEntity.ok().body(optionalDoctor.get());
	}

	public ResponseEntity<?> addNewDoctor(Doctor doctor) {
		doctorRepository.save(doctor);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<?> removeDoctor(Long doctor_id) {
		if (doctorRepository.findById(doctor_id).isEmpty())
			return new ResponseEntity<>(
				"Error: doctor_id: " + doctor_id + " not found.",
				HttpStatus.NOT_FOUND
			);

		doctorRepository.deleteById(doctor_id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> updateDoctorInfo(
		Long doctor_id,
		String firstName,
		String lastName,
		Specialization specialization) {
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor_id);
		if (doctorRepository.findById(doctor_id).isEmpty())
			return new ResponseEntity<>(
				"Error: doctor_id: " + doctor_id + " not found.",
				HttpStatus.NOT_FOUND
			);

		if (firstName != null && !firstName.isEmpty())
			optionalDoctor.get().setFirstName(firstName);

		if (lastName != null && !lastName.isEmpty())
			optionalDoctor.get().setLastName(lastName);

		if (specialization != null && specializationService.specializationExists(specialization.getName()))
			optionalDoctor.get().setSpecialization(specialization);

		return new ResponseEntity<>(optionalDoctor.get(), HttpStatus.OK);
	}

}