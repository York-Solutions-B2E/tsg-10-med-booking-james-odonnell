package net.york.tsg.doctor;

import net.york.tsg.specialization.Specialization;
import net.york.tsg.specialization.SpecializationService;

import net.york.tsg.appointment.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

@Service
public class DoctorService {

	private final DoctorRepository doctorRepository;
	private final SpecializationService specializationService;
	private final AppointmentService appointmentService;

	@Autowired
	public DoctorService(
			DoctorRepository doctorRepository,
			SpecializationService specializationService,
			AppointmentService appointmentService) {
		this.doctorRepository = doctorRepository;
		this.specializationService = specializationService;
		this.appointmentService = appointmentService;
	}

	public ResponseEntity<?> getAllDoctors() {
		return ResponseEntity.ok().body(doctorRepository.findAll());
	}

	public ResponseEntity<?> getDoctorById(Long doctorId) {
		if (doctorId == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
		if (optionalDoctor.isEmpty())
			return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body("Error: doctorId: " + doctorId + " not found.");

		return ResponseEntity.ok().body(optionalDoctor.get());
	}

	public ResponseEntity<?> getAllDoctorsBySpecialization(Long specializationId) {
		List<Doctor> doctors = doctorRepository.findAllBySpecialization(specializationId);
		ArrayList<Doctor> activeDoctors = new ArrayList<Doctor>();
		for (Doctor doctor : doctors)
			if (doctor.getStatus() == DoctorStatus.ACTIVE)
				activeDoctors.add(doctor);
		return ResponseEntity.ok().body(activeDoctors);
	}

	public ResponseEntity<?> addNewDoctor(Doctor doctor) {
		doctorRepository.save(doctor);
		return ResponseEntity.ok().body(doctor);
	}

	public ResponseEntity<?> removeDoctor(Long doctorId) {
		if (doctorId == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
		if (optionalDoctor.isEmpty())
			return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body("Error: doctor_id: " + doctorId + " not found.");

		appointmentService.cancelAllByDoctorId(doctorId);
		optionalDoctor.get().setStatus(DoctorStatus.INACTIVE);
		doctorRepository.save(optionalDoctor.get());
		return ResponseEntity.ok().body(optionalDoctor.get());
	}

	@Transactional
	public ResponseEntity<?> updateDoctorInfo(Doctor doctor) {
		if (doctor.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor.getId());
		if (optionalDoctor.isEmpty())
			return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body("Error: doctor_id: " + doctor.getId() + " not found.");

		if (doctor.getFirstName() != null && !doctor.getFirstName().isEmpty())
			optionalDoctor.get().setFirstName(doctor.getFirstName());

		if (doctor.getLastName() != null && !doctor.getLastName().isEmpty())
			optionalDoctor.get().setLastName(doctor.getLastName());

		if (doctor.getSpecialization() != null && specializationService.specializationExists(doctor.getSpecialization().getName()))
			optionalDoctor.get().setSpecialization(doctor.getSpecialization());

		return ResponseEntity.ok().body(optionalDoctor.get());
	}

}