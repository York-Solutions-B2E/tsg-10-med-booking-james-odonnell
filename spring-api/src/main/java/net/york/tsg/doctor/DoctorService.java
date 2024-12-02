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

	public ResponseEntity<?> getDoctorById(Doctor doctor) {
		if (doctor.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor.getId());
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: doctor_id: " + doctor.getId() + " not found.",
				HttpStatus.NOT_FOUND
			);
		return ResponseEntity.ok().body(optionalDoctor.get());
	}

	public ResponseEntity<?> addNewDoctor(Doctor doctor) {
		doctorRepository.save(doctor);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<?> removeDoctor(Doctor doctor) {
		if (doctor.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		if (doctorRepository.findById(doctor.getId()).isEmpty())
			return new ResponseEntity<>(
				"Error: doctor_id: " + doctor.getId() + " not found.",
				HttpStatus.NOT_FOUND
			);

		doctorRepository.deleteById(doctor.getId());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> updateDoctorInfo(Doctor doctor) {
		if (doctor.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor.getId());
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: doctor_id: " + doctor.getId() + " not found.",
				HttpStatus.NOT_FOUND
			);

		if (doctor.getFirstName() != null && !doctor.getFirstName().isEmpty())
			optionalDoctor.get().setFirstName(doctor.getFirstName());

		if (doctor.getLastName() != null && !doctor.getLastName().isEmpty())
			optionalDoctor.get().setLastName(doctor.getLastName());

		if (doctor.getSpecialization() != null && specializationService.specializationExists(doctor.getSpecialization().getName()))
			optionalDoctor.get().setSpecialization(doctor.getSpecialization());

		return new ResponseEntity<>(optionalDoctor.get(), HttpStatus.OK);
	}

}